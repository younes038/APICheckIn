import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CheckIn } from './checkIn';

@Injectable()
export class CheckInService {
  private baseURL: string = "http://checkin-api.dev.cap-liberte.com/";
  private authToken;

  constructor(private http: Http) {
    this.http = http;
    this.authToken = null;
  }

  authenticate(user) {
    var body = JSON.stringify(user);
    var headers = new Headers({'Content-Type': 'x-www-form-urlencoded'});

    return new Promise(resolve => {
      this.http
          .post(this.baseURL+`auth`, body, {headers: headers}).subscribe(data => {
            if(data.json().token) {
              var token = data.json().token;
              this.authToken = token;
              window.localStorage.setItem('token', token);
              resolve(true);
            } else {
              resolve(false);
            }
      });
    });
  }

  logout() {
    this.authToken = null;
    window.localStorage.removeItem('token');
  }

  getListCheckIn(): Observable<CheckIn[]> {
    return this.http
               .get(this.baseURL+`checkin`)
               .map(response => response.json() as CheckIn[]);
  }

  getCheckIn(id): Observable<CheckIn> {
    return this.http
               .get(this.baseURL+`checkin/`+id)
               .map(response => response.json() as CheckIn);
  }
}