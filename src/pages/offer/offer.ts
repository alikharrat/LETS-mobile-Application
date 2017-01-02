import { Component, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { OfferService } from '../../services/OfferService';
import { AlertService } from '../../services/AlertService';
import { Offer } from '../../domain/Offer';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage implements OnInit {
	private username: string;
	private offers: Array<Offer>;

  constructor(public navCtrl: NavController,
		private menuCtrl: MenuController,
		private authService: AuthService,
		private offerService: OfferService,
		private alertService: AlertService) {
		this.authService.getUserInfo.subscribe(
			userInfo => {
				this.username = userInfo.name;
			});
		this.authService.loadToken();
  }

  ngOnInit(): void {
		this.offerService.list()
		.subscribe(
			result => this.offers = result,
			error => this.alertService.showError('Connection problem!')
			);
	}

	stateIcons = {
		'done': 'checkmark-circle',
		'pending': 'ios-time'
	}
}
