import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { LetsApp } from './app.component';
import { AppSettings } from './app.settings';
import { AuthService } from '../services/AuthService';
import { LoginPage } from '../pages/login/login';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    LetsApp,
    LoginPage,
    Page1,
    Page2
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
    Page1,
    Page2
  ],
  providers: [AppSettings, AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
