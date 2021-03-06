import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CheckIn } from './checkIn';
import { User } from './user';

@Injectable()
export class CheckInService {
  private baseURL: string = "http://checkin-api.dev.cap-liberte.com/";
  private authToken;

  constructor(private http: Http) {
    this.http = http;
    this.authToken = localStorage.getItem('token');
  }

  authenticate(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'x-www-form-urlencoded'});

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

  isLogged():boolean {
    return window.localStorage.getItem('token')?true:false;
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

  addCheckIn(checkin) {
    let body = JSON.stringify(checkin);
    let headers = new Headers({'Content-Type': 'x-www-form-urlencoded', 'Authorization': `Bearer ${this.authToken}`});
    
    return new Promise(resolve => {
      this.http
        .post(this.baseURL+`checkin`, body, {headers: headers}).subscribe(data => {
          if(data.json()) {
            resolve(data.json() as CheckIn);
          } else {
            resolve(false);
          }
      });
    });
  }

  signup(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    
    return new Promise(resolve => {
      this.http
        .post(this.baseURL+`signup`, body, {headers: headers}).subscribe(data => {
          if(data.json().token) {
            let token = data.json().token;
            this.authToken = token;
            window.localStorage.setItem('token', token);
            resolve(true);
          } else {
            resolve(false);
          }
      });
    });
  }

  getAccount(): Observable<User> {
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authToken}`});
    
    return this.http
               .get(this.baseURL+`account`, {headers: headers})
               .map(response => response.json() as User);
  }
  
  updateAccount(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'x-www-form-urlencoded', 'Authorization': `Bearer ${this.authToken}`});
    
    return new Promise(resolve => {
      this.http
        .post(this.baseURL+`account`, body, {headers: headers}).subscribe(data => {
          if(data.json()) {
            resolve(data.json() as User);
          } else {
            resolve(false);
          }
      });
    });
  }
}