import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare var CameraPreview: any;

/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  /*Called first time page is opened*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

    CameraPreview.startCamera({
    	x: 90, 
    	y: 225, 
    	width: window.screen.width - 90, 
    	height: window.screen.height - 300, 
    	camera: "back", 
    	toBack: false, 
    	tapPhoto: false, 
    	previewDrag: false
    });


  }

 /*Called every time view is closed*/
  ionViewWillLeave() {
  	CameraPreview.hide();
  }


 /*Called every time view is opened*/
  ionViewWillEnter() {
 	CameraPreview.show();
  }


  switchCamera() {
  	CameraPreview.switchCamera();
  }

  takePicture(){
    CameraPreview.takePicture(function(imgData){
    	var previewImage = document.getElementById('originalPicture') as HTMLImageElement;
     	previewImage.src = 'data:image/jpeg;base64,' + imgData;
    });
  }


}
