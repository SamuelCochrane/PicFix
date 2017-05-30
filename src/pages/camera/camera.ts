import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormCarPage } from '../form-car/form-car';
import { AddInfoPage } from '../add-info/add-info';
import { CameraConfirmPage } from '../camera-confirm/camera-confirm';
import { ToastController } from 'ionic-angular';



import { GlobalVars } from '../../providers/global-vars';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


declare var CameraPreview: any;


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public toastCtrl: ToastController, private nativePageTransitions: NativePageTransitions) {}

  /*Called first time page is opened*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
/*
    CameraPreview.startCamera({
    	x: 0,
    	y: 0,
    	width: window.screen.width,
    	height: window.screen.height - 150,
    	camera: "back",
    	toBack: true,
    	tapPhoto: false,
    	previewDrag: false
    });*/

  }

 /*Called every time view is closed*/
  ionViewWillLeave() {
  	CameraPreview.hide();

    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 500,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 100,
       androiddelay: 150,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      };

    this.nativePageTransitions.slide(options);

     //var overlay  = document.getElementById('overlayImg') as HTMLImageElement;
     //overlay.src =  "";
  }


 /*Called every time view is opened*/
  ionViewWillEnter() {

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
 	  //CameraPreview.show();
    this.showOverlay();




  }

  ionViewDidEnter() {
     this.gVars.presentToast('Please take a picture of the issue. \n \n (Hint: try to line your picture up with the overlay)');


  }

  showOverlay() {
    CameraPreview.hide();
    CameraPreview.show();
    console.log('~~~~~~~~~~~~~~');

     var overlay  = document.getElementById('overlayImg') as HTMLImageElement;

     var report = this.gVars.getCurrentReport();

    console.log(report.reportType);
    console.log(overlay.src);
     if(report.reportType == 'pothole') { overlay.src = 'assets/overlays/pothole.png'; }
     else if(report.reportType == 'car') { overlay.src = 'assets/overlays/car.png'; }

    console.log(overlay.src);
    overlay.style.zIndex = "-1";
  }


  switchCamera() {
  	CameraPreview.switchCamera();
  }

  takePicture(){
  	var _this = this;
    CameraPreview.takePicture(function(imgData){

    	//save pic to local storage
     	var pic = 'data:image/jpeg;base64,' + imgData;
      //var pic = imgData;

     	var report = _this.gVars.getCurrentReport();
      //console.log(report)


     	report.image = pic;

     	_this.gVars.updateCurrentReport(report);

      if(report.reportType == "car") {
       	//launch the camera confirm page
       	_this.navCtrl.push(FormCarPage, {});
      } else if (report.reportType == "pothole") {
        _this.navCtrl.push(AddInfoPage, {});
      } else {
        alert("ERROR: No Report Type Selected!");
      }

    });


  }

  private flashOn = false;
  toggleFlash(){
  		console.log("toggling flash!");
      this.flashOn =  !this.flashOn;
      //if(this.flashOn) {CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.OFF);}
      //else {CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.ON);}
  		/*this.navCtrl.push(CameraConfirmPage, {
  			picture: pictureData
  		});*/
      if(this.flashOn) {this.gVars.presentToast('flash is now ON');}
      else {this.gVars.presentToast('flash is now OFF');}

  }

  createReportFile() {


  }


  refresh(){
    window['location'].reload();
  }



}
