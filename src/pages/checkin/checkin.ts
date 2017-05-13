import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Camera, Geolocation } from 'ionic-native';

import { CheckInService } from '../../services/checkin.service';
import { CheckIn } from '../../services/checkin';
import { CheckinDetailPage } from '../checkin-detail/checkin-detail';

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
  checkins: Array<CheckIn>

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService, public modalCtrl: ModalController) {
    this.checkinService = checkinService;
    this.checkinService.getListCheckIn().subscribe(
        data => {
            this.checkins = data;
        },
        err => {
            console.log(err);
        },
        () => console.log('Get checkin completed')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  refreshList(refresher) {
    this.checkinService.getListCheckIn().subscribe(
      data => {
          this.checkins = data;
      }
    );
    refresher.complete();
  }
  
  gotoDetail(id): void {
    this.navCtrl.push(CheckinDetailPage, {id: id});
  }

  presentModal() {
    let modal = this.modalCtrl.create(AddCheckin);
    modal.present();
  }

}


@Component({
  selector: 'page-addCheckin',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Ajouter un checkin</ion-title>
        <ion-buttons end>
          <button ion-button icon-only class="button button-icon" (click)="dismiss()">Fermer</button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid>
        <ion-row>
          <ion-col text-center>
            Sélectionner une image:
          </ion-col>
        </ion-row>
        
        <ion-row>
          <ion-col text-center>
            <img [src]="checkin.image" />
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col text-center>
            <div round ion-button role="button button-icon button-md button-round-md" class="button button-icon" (click)="openGallery()">
              <ion-icon name="images"></ion-icon>
            </div>
            <div round ion-button role="button button-icon button-md button-round-md" class="button button-icon" (click)="takePicture()">
              <ion-icon name="camera"></ion-icon>
            </div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col text-center>
            <form (submit)="addCheckin()">
              <ion-input type="hidden" name="image" [(ngModel)]="checkin.image" [disabled] style="display:none"></ion-input>
              <button ion-button block class="button button-icon" type="submit">Confirmer</button>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `
})
export class AddCheckin {
  checkin;

  constructor(public viewCtrl: ViewController, private checkinService: CheckInService) {
    this.checkin = {
      lat: 0,
      lng: 0,
      image: ''
    };
    this.checkinService = checkinService;
    Geolocation.getCurrentPosition().then((pos) => {
      this.checkin.lat = pos.coords.latitude;
      this.checkin.lng = pos.coords.longitude;
    }, (err) => {
      console.log(err);
    });
  }

  addCheckin() {
    this.checkinService.addCheckIn(this.checkin).then(() => {
      console.log(this.checkin.image)
      this.dismiss();
    });
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((image) => {
        this.checkin.image = 'data:image/jpeg;base64,'+image;
    }, (err) => {
        console.log(err);
    });
  }

  openGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((image) => {
        this.checkin.image = 'data:image/jpeg;base64,'+image;
      }, (err) => {
        console.log(err);
    });   
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}