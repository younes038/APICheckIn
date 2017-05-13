import { Component } from '@angular/core';

import { CheckInPage } from '../checkin/checkin';
import { AccountPage } from '../account/account';
import { MapsPage } from '../maps/maps';

import { CheckInService } from '../../services/checkin.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CheckInPage;
  tab2Root: any = MapsPage;
  tab3Root: any = AccountPage;

  constructor(private checkinService: CheckInService) {
    
  }
}
