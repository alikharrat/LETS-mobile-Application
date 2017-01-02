import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Offer } from '../domain/Offer';
import { OFFERS } from '../test/mock-offers';

@Injectable()
export class OfferService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Offer>> {
		// return this.httpBasicAuth.getWithAuth(this.settings.URL.offers)
		return this.httpBasicAuth.get(this.settings.URL.config)
		.map(response => {
			return OFFERS;
		});
	}
}