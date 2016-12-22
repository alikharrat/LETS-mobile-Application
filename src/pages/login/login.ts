import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { AlertService } from '../../services/AlertService';
import { Page1 } from '../page1/page1';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	private username: string;
	private password: string;

	constructor(private navCtrl: NavController,
		private toastCtrl: ToastController,
		private alertService: AlertService,
		private authService: AuthService) {
	}

	login() {
		console.log(this.username, this.password);
		this.authService.login(this.username, this.password)
			.subscribe(
			result => this.navCtrl.push(Page1),
			error => this.alertService.showError('Connection problem!')
			);
	}

}
