import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';
import * as firebase from 'firebase';



/*
  Generated class for the MyReportsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-reports',
  templateUrl: 'my-reports.html'
})
export class MyReportsPagePage {

  private reports: any;
  private af: any;
  private storage: any;
  private imageArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, db: AngularFireDatabase) {
    this.af = af;
    this.storage = firebase.storage().ref();
    this.reports = [];

    this.af.database.list('/finalReport').subscribe(reports => {
        this.reports = reports;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReportsPagePage');
  }




}
