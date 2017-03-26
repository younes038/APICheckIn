import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CheckInPage } from '../checkin/checkin';
import { CheckInService } from '../../services/checkin.service';
import { CheckIn } from '../../services/checkin';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
    this.checkinService = checkinService;
    this.checkinService.getAccount().subscribe(
        data => {
            this.user = data;
        }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout() {
    this.checkinService.logout();
    this.navCtrl.setRoot(CheckInPage);
  }

  updateAccount() {
    this.checkinService.updateAccount(this.user);
  }

}
