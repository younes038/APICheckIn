import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CheckInPage } from '../checkin/checkin';
import { LoginPage } from '../login/login';
import { MapsPage } from '../maps/maps';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CheckInPage;
  tab3Root: any = MapsPage;
  tab4Root: any = LoginPage;

  constructor() {

  }
}
