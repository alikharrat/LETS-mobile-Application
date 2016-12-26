import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { LetsApp } from './app.component';
import { AppSettings } from './app.settings';
import { AuthService } from '../services/AuthService';
import { ConfigService } from '../services/ConfigService';
import { AlertService } from '../services/AlertService';
import { HttpBasicAuth } from '../services/HttpBasicAuth';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(LetsApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LetsApp,
    LoginPage,
    HomePage
  ],
  providers: [
    AppSettings,
    AuthService,
    ConfigService,
    AlertService,
    HttpBasicAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
