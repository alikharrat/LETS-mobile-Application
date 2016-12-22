import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { Page1 } from '../page1/page1';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	private username: string;
	private password: string;

	constructor(public navCtrl: NavController,
		private authService: AuthService) {
	}

	login() {
		console.log(this.username, this.password);
		this.authService.login(this.username, this.password)
			.subscribe((result) => {
				if (result) {
					this.navCtrl.push(Page1);
				}
			});
	}

}
