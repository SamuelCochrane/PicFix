import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';
import * as firebase from 'firebase';



/*
  Page that shows a list of all reports submitted to the server
  Each entry will have the picture, as well as what text was submitted in the 'additional info' section

  This page is feature-lacking, and is closer to 'proof of concept' than 'full feature'
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
