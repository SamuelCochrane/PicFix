import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';
import { MyReportsPagePage } from '../my-reports/my-reports';

import {AngularFire, FirebaseListObservable} from 'angularfire2';



declare var cordova: any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, af: AngularFire) {

  }


  goToCategoriesPage() {
    this.navCtrl.push(CategoriesPage, {});
  }

  goToReportsPage() {
    this.navCtrl.push(MyReportsPagePage, {});
  }


  ionViewDidLoad() {

    //make sure we have all the permissions needed for the app to run.
    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
      switch(status){
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
        console.log("Permission granted to use the camera");
        break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
        console.log("Permission to use the camera has not been requested yet");
        break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
        console.log("Permission denied to use the camera - ask again?");
        break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
        console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
        break;
      }
    }, function(error){
      console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION);


  }




}
