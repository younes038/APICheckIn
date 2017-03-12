import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
import { CheckIn } from '../../services/checkin'


/*
Generated class for the Maps page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
	selector: 'page-maps',
	templateUrl: 'maps.html'
})
export class MapsPage {
	
	checkins: Array<CheckIn>

	constructor(public navCtrl: NavController, public navParams: NavParams, private checkinService: CheckInService) {
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

	// Load map only after view is initialize
	ngAfterViewInit() {
		this.loadMap();
	}

	loadMap() {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');
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

			// add marker to map for each checkin (works only when map ready)
			this.checkins.forEach((c, index, array) => {
				// create new marker
				let markerOptions: GoogleMapsMarkerOptions = {
					position: new GoogleMapsLatLng(c.lat, c.lng),
					title: `Marker ${index}`
				};

				map.addMarker(markerOptions);
			});
		});
	}
}