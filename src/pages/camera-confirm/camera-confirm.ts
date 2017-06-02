import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalVars } from '../../providers/global-vars';
import { FormCarPage } from '../form-car/form-car';
import { AddInfoPage } from '../add-info/add-info';
import { CameraPage } from '../camera/camera';



/*
  This page displays the current image stored in the report.
  From there the user can 'confirm' the image and simply go back to where they were before,
  or 'retake' the image to be popped all the way back to the Camera. (note this will clear their report)  
*/
@Component({
  selector: 'page-camera-confirm',
  templateUrl: 'camera-confirm.html'
})
export class CameraConfirmPage {
  public passedFrom;


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
    this.passedFrom = navParams.get("passedFrom");
  }

  /*Called when the page enters focus*/
  ionViewDidEnter() {
  
    //set the src of the image element to the current report image.
    var previewImage = document.getElementById('confirmPicture') as HTMLImageElement;
	  var report = this.gVars.getCurrentReport();
    previewImage.src = report.image;

  }

  confirmImage() {
    //no changes to make, so lets just return  to where we started
    this.navCtrl.pop();
  }

  retryImage() {
    //pop all the way back to Camera
    this.navCtrl.remove(this.navCtrl.getActive().index);
    if(this.passedFrom == "carAddInfo") { this.navCtrl.remove(this.navCtrl.getActive().index - 1); }
  	this.navCtrl.pop();
  }

}
