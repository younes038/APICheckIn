import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { HomePage } from '../home/home';
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
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
    this.checkinService = checkinService;
    this.checkinService.getAccount().subscribe(
      data => {
        this.user = data;
        this.user.picture_url = (this.user.picture_url == null ? '':this.user.picture_url)
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout() {
    this.checkinService.logout();
    this.navCtrl.setRoot(HomePage);
  }

  updateAccount(user) {
    this.checkinService.updateAccount(user).then(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((image) => {
        this.user.picture_url = 'data:image/jpeg;base64,'+image;
    }, (err) => {
        console.log(err);
    });
  }

  openGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((image) => {
        this.user.picture_url = 'data:image/jpeg;base64,'+image;
      }, (err) => {
        console.log(err);
    });   
  }

}
