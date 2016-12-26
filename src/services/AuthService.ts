import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Member } from '../domain/Member';
import { MEMBER } from '../test/mock-member';

@Injectable()
export class AuthService {
	private LOCAL_TOKEN_KEY: string;
	private isAuthenticated: boolean;

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) {
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
		window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
	}

	private setToken(token) {
		this.isAuthenticated = true;
	}

	logout() {
		return this.httpBasicAuth.get(this.settings.URL.userLogout)
			.map(response => {
				console.log('logout', response);
				this.destroyToken();
				return response;
			});
	}

	getUserInfo() {
		// return this.httpBasicAuth.getWithAuth(this.settings.URL.userInfo)
		return this.httpBasicAuth.get(this.settings.URL.config)
			.map((response) => {
				console.log('getUserInfo', MEMBER);
				// this.storeToken(response);
				// return response;
				return MEMBER;
			});
	}

	login(username, password) {
		// return this.httpBasicAuth.post(
		// 	this.settings.URL.userLogin,
		// 	JSON.stringify({
		// 		username: username,
		// 		password: password
		// 	})
		// ).map(response => {
		// 	console.log('login json', response);
			this.httpBasicAuth.setAuthorizationToken(username, password);
			return this.getUserInfo();
		// });
	}
}