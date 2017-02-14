import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CheckIn } from './checkIn';

@Injectable()
export class CheckInService {

  private baseURL: string = "http://checkin-api.dev.cap-liberte.com/";

  constructor(private http: Http) {}

  list(): Observable<CheckIn[]> {
    return this.http
               .get(this.baseURL+`checkin`)
               .map(response => response.json() as CheckIn[]);
  }
}