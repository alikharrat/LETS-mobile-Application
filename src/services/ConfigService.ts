import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { AlertService } from './AlertService';
import { Config } from '../domain/Config';

@Injectable()
export class ConfigService {
	private config: Config;
	private appConfig = new Subject<Config>();
	getAppConfig = this.appConfig.asObservable();

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth,
		private alertService: AlertService) { 
		this.loadAppConfig();
	}

	loadAppConfig() {
		if (this.config) {
			this.appConfig.next(this.config);
		} else {
			this.requestAppConfig().subscribe(
				result => this.appConfig.next(result),
				error => this.alertService.showError('Connection problem!')
			);
		}
	}

	requestAppConfig(): Observable<Config> {
		return this.httpBasicAuth.get(this.settings.URL.config)
			.map(response => {
				this.config = response;
				return response;
			});
	}
}