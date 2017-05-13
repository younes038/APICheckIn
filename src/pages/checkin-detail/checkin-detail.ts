import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geocoder, GeocoderRequest, GeocoderResult } from 'ionic-native';

import {
GoogleMap,
GoogleMapsEvent,
GoogleMapsLatLng,
CameraPosition,
GoogleMapsMarkerOptions,
GoogleMapsMarker,
Geolocation
} from 'ionic-native';

import { CheckInService } from '../../services/checkin.service';
import { CheckIn } from '../../services/checkin';

/*
  Generated class for the CheckinDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin-detail',
  templateUrl: 'checkin-detail.html'
})
export class CheckinDetailPage {
  checkin: CheckIn;
  address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
    this.checkinService = checkinService;
    this.checkinService.getCheckIn(this.navParams.get('id')).subscribe(
        data => {
            this.checkin = data;
            let req: GeocoderRequest = new GoogleMapsLatLng(this.checkin.lat, this.checkin.lng);
            Geocoder.geocode(req).then((results: GeocoderResult) => {
              this.address = [
                (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
                results[0].locality
              ].join(", ");
            });
        },
        err => {
            console.log(err);
        },
        () => console.log('Get checkin completed')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinDetailPage');
    this.loadMap();
  }

  loadMap() {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('carte');
		let map = new GoogleMap(element);
		
		// listen to MAP_READY event
		map.one(GoogleMapsEvent.MAP_READY).then(() => {
			// get user current position
			Geolocation.getCurrentPosition().then((pos) => {
				// create LatLng object
				let geoloc: GoogleMapsLatLng = new GoogleMapsLatLng(pos.coords.latitude, pos.coords.longitude);

				// create CameraPosition
				let position: CameraPosition = {
					target: geoloc,
					zoom: 13
				};

				// move the map's camera to position
				map.moveCamera(position); // works on iOS and Android
			}, (err) => {
				console.log(err);
			});

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: new GoogleMapsLatLng(this.checkin.lat, this.checkin.lng),
        title: `Marker ${this.checkin.id}`
      };

      map.addMarker(markerOptions);
		});
	}
}
