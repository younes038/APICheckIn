import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage, SignupPage } from '../pages/home/home';
import { MapsPage } from '../pages/maps/maps';
import { AccountPage } from '../pages/account/account';
import { CheckInPage, AddCheckin } from '../pages/checkin/checkin';
import { CheckinDetailPage } from '../pages/checkin-detail/checkin-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckInService } from '../services/checkin.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapsPage,
    SignupPage,
    AccountPage,
    CheckInPage,
    AddCheckin,
    CheckinDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapsPage,
    SignupPage,
    AccountPage,
    CheckInPage,
    AddCheckin,
    CheckinDetailPage
  ],
  providers: [CheckInService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
