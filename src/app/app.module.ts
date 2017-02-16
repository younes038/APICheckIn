import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapsPage } from '../pages/maps/maps';
import { LoginPage } from '../pages/login/login';
import { CheckInPage } from '../pages/checkin/checkin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckInService } from '../services/checkin.service';

@NgModule({
  declarations: [
    MyApp,
    MapsPage,
    LoginPage,
    CheckInPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapsPage,
    LoginPage,
    CheckInPage,
    HomePage,
    TabsPage
  ],
  providers: [CheckInService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
