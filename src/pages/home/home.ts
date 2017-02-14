import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CheckInService } from '../../services/checkin.service';
import { CheckIn } from '../../services/checkin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  checkin: Array<CheckIn>;

  constructor(public navCtrl: NavController, private checkinService: CheckInService) {
    
  }

  ngOnInit(): void {
    this.checkinService.list().subscribe(
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
