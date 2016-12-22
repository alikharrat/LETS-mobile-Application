import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AlertService {
	constructor(private toastCtrl: ToastController) { }

	showError(message) {
		return this.toastCtrl.create({
			message: message,
			duration: 3000
		}).present();
	}
};