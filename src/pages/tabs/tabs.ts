import { Component } from '@angular/core';

import { CheckInPage } from '../checkin/checkin';
import { LoginPage } from '../login/login';
import { AccountPage } from '../account/account';
import { MapsPage } from '../maps/maps';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CheckInPage;
  tab2Root: any = MapsPage;
  tab3Root: any = LoginPage;
  tab4Root: any = AccountPage;

  constructor() {
    
  }
}
