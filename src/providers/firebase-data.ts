import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseData {
  // private _db: any;
  // private _picfixRef: any;

  constructor(public http: Http) {
    console.log('Hello FirebaseData Provider');
    // this._db = firebase.database().ref('/');
    // this._picfixRef = firebase.database().ref('picfix')
  }

}
