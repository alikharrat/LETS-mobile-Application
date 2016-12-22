import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';

@Injectable()
export class AuthService {
	LOCAL_TOKEN_KEY: string;
	isAuthenticated: boolean;
	role: string;
	userInfo: any;

	constructor(private settings: AppSettings,
		private http: Http) {
		this.LOCAL_TOKEN_KEY = 'auth_token';
		this.isAuthenticated = false;
		this.loadToken();
	}

	private loadToken() {
		var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
		if (token) {
			this.setToken(token);
		}
	}

	private storeToken(token) {
		window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
		this.setToken(token);
	}

	private destroyToken() {
		this.isAuthenticated = false;
		this.userInfo = undefined;
		// this.http.defaults.headers.common['X-Auth-Token'] = undefined;
		window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
	}

	private setToken(token) {
		console.log('token', token);
		this.userInfo = token;
		this.isAuthenticated = true;
		this.role = this.settings.USER_ROLES.member;
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

	logout() {
		return (<any>this.http.get(this.settings.URL.conUrl + 'user/logout'))
			.map(res => {
				console.log('logout', res);
				this.destroyToken();
				return res;
			}).catch(this.handleError);
	}

	private getLoginInfo(username) {
		return this.http.get(this.settings.URL.conUrl + 'member/' + username)
			.map(res => {
				console.log('getLoginInfo', res);
				res.json();
			}).map((res) => {
				console.log('getLoginInfo json', res);
				this.storeToken(res);
				return res;
			}).catch(this.handleError);
	}

	login(username, password) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.post(
			this.settings.URL.con + 'user/login',
			JSON.stringify({
				name: username,
				pass: password,
				form_id: 'user-login-form',
				// form_build_id: 'form-i4d5zJN6iOPpuugLivXCJDgYg48y4Ou19b1rWYNg4pw',
				op: 'Log in'
			}),
			{ headers }
		).map(res => {
			console.log('login', res)
			res.json();
		}).map((res) => {
			console.log('login json', res);
			return this.getLoginInfo(username);
		}).catch(this.handleError);
	}

	getUserInfo(user_id) {
		return (<any>this.http.get(this.settings.URL.conUrl + user_id))
			.map(res => {
				console.log('getUserInfo', res)
				return res;
			}).catch(this.handleError);
	}

};