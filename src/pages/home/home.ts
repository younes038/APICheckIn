import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CheckInService } from '../../services/checkin.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService, public modalCtrl: ModalController) {
    this.checkinService = checkinService;
    if (this.checkinService.isLogged()) {
      this.navCtrl.setRoot(TabsPage);
    }
    this.user = {
      email: '',
      password: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  authenticate(user) {
    this.checkinService.authenticate(user).then(data => {
      if(data) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  register() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

}


@Component({
  selector: 'page-signup',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>S'inscrire</ion-title>
        <ion-buttons end>
          <button ion-button icon-only class="button button-icon" (click)="dismiss()">Fermer</button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <form (submit)="signup(user)" #registerForm="ngForm">
        <ion-list inset>
          
          <ion-item>
            <ion-input type="text" placeholder="Nom" name="name" [(ngModel)]="user.name" required></ion-input>
          </ion-item>

          <ion-item>
            <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>
          </ion-item>
          
          <ion-item>
            <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required></ion-input>
          </ion-item>
          
          <ion-item>
            <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Confirmer</button>
          </ion-item>

        </ion-list>
      </form>
    </ion-content>
  `
})
export class SignupPage {
  user: Object;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private checkinService: CheckInService) {
    this.checkinService = checkinService;
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

  signup(user) {
    this.checkinService.signup(user).then(data => {
      if (data) {
        this.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
