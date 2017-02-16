import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CheckInService } from '../../services/checkin.service';
import { CheckIn } from '../../services/checkin';

/*
  Generated class for the Checkin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckInPage {

  checkin: Array<CheckIn>

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
    this.checkinService = checkinService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
    this.checkinService.getListCheckIn().subscribe(
        data => {
            this.checkin = data;
        },
        err => {
            console.log(err);
        },
        () => console.log('Get checkin completed')
    );
  }

}
