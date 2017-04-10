import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalVars } from '../../providers/global-vars'
/*
  Generated class for the CameraConfirm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera-confirm',
  templateUrl: 'camera-confirm.html'
})
export class CameraConfirmPage {
  public picture:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CameraConfirmPage');

    var previewImage = document.getElementById('confirmPicture') as HTMLImageElement;


	var pic = localStorage.getItem('imgData');

     previewImage.src = pic;

	  var report = this.gVars.getCurrentReport();
    previewImage.src = report.images;



  }




  confirmImage() {
  	//this.navCtrl.push([form page]);
  }

  retryImage() {
  	this.navCtrl.pop();
  }

}
