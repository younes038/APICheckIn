import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapsPage } from '../pages/maps/maps';
import { LoginPage, Signup } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { CheckInPage, AddCheckin } from '../pages/checkin/checkin';
import { CheckinDetailPage } from '../pages/checkin-detail/checkin-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckInService } from '../services/checkin.service';

@NgModule({
  declarations: [
    MyApp,
    MapsPage,
    LoginPage,
    Signup,
    AccountPage,
    CheckInPage,
    AddCheckin,
    CheckinDetailPage,
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
    Signup,
    AccountPage,
    CheckInPage,
    AddCheckin,
    CheckinDetailPage,
    TabsPage
  ],
  providers: [CheckInService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
