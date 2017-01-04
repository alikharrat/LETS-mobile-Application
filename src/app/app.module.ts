import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { LetsApp } from './app.component';
import { AppSettings } from './app.settings';
import { AuthService } from '../services/AuthService';
import { ConfigService } from '../services/ConfigService';
import { TransactionService } from '../services/TransactionService';
import { OfferService } from '../services/OfferService';
import { AlertService } from '../services/AlertService';
import { HttpBasicAuth } from '../services/HttpBasicAuth';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { OfferPage } from '../pages/offer/offer';

@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    HomePage,
    OfferPage
  ],
  imports: [
    IonicModule.forRoot(LetsApp),
    HttpModule,
    JsonpModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LetsApp,
    LoginPage,
    HomePage,
    OfferPage
  ],
  providers: [
    AppSettings,
    AuthService,
    ConfigService,
    TransactionService,
    OfferService,
    AlertService,
    HttpBasicAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
