import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormCarPage } from '../form-car/form-car';
import { CameraConfirmPage } from '../camera-confirm/camera-confirm';
import { ToastController } from 'ionic-angular';



import { GlobalVars } from '../../providers/global-vars'

declare var CameraPreview: any;


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public toastCtrl: ToastController) {}

  /*Called first time page is opened*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

    CameraPreview.startCamera({
    	x: 0,
    	y: 0,
    	width: window.screen.width,
    	height: window.screen.height - 150,
    	camera: "back",
    	toBack: true,
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
    this.presentToast();


  }


  switchCamera() {
  	CameraPreview.switchCamera();
  }

  takePicture(){
  	var _this = this;
    CameraPreview.takePicture(function(imgData){

    	//save pic to local storage
     	var pic = 'data:image/jpeg;base64,' + imgData;

     	var report = _this.gVars.getCurrentReport();
      //console.log(report)


     	report.images = pic;

     	_this.gVars.updateCurrentReport(report);


       	//launch the camera confirm page
       	_this.navCtrl.push(FormCarPage, {});
      }

    });


  }

  toggleFlash(){
  		console.log("toggling flash!");
  		/*this.navCtrl.push(CameraConfirmPage, {
  			picture: pictureData
  		});*/
      this.presentToast();

  }

  createReportFile() {


  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Please line the overlay up with the object',
      duration: 3000,
      position: 'top'

    });
    toast.present();
    console.log('toast got called')
  }
  
  refresh(){
    window['location'].reload();
  }



}
