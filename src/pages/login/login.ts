import { Component,  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CheckInService } from '../../services/checkin.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
    this.checkinService = checkinService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authenticate(user) {
    this.checkinService.authenticate(user).then(data => {
      if(data) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  logout() {
    this.checkinService.logout();
  }

}
