import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormCarPage } from '../form-car/form-car';
import { AddInfoPage } from '../add-info/add-info';
import { CameraConfirmPage } from '../camera-confirm/camera-confirm';
import { ToastController } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';

declare var CameraPreview: any;


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public toastCtrl: ToastController) {}

  /*Called first time page is opened*/
  ionViewDidLoad() {
    console.log('CameraPage Started');
  }

 /*Called every time view is closed*/
  ionViewWillLeave() {
  	CameraPreview.hide();
  }

 /*Called every time view is about to open*/
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

    this.showOverlay();
  }


 /*Called every time view is opened*/
  ionViewDidEnter() {
     this.gVars.presentToast('Please take a picture of the issue. \n \n (Hint: try to line your picture up with the overlay)');


  }

  showOverlay() {
    //refresh camera
    CameraPreview.hide();
    CameraPreview.show();
   
    //set the report image's source to the correct type for this report.
    var overlay  = document.getElementById('overlayImg') as HTMLImageElement;
    var report = this.gVars.getCurrentReport();

    if(report.reportType == 'pothole') { overlay.src = 'assets/overlays/pothole.png'; }
    else if(report.reportType == 'car') { overlay.src = 'assets/overlays/car.png'; }

    overlay.style.zIndex = "-1"; //make sure the overlay renders on top of the camera.
  }


  switchCamera() {
  	CameraPreview.switchCamera(); //toggle between front and back facing camera.
  }

  /*
   * Called by pressing the camera button.
   * Will update current report with this image, then push us into the report
   */
  takePicture(){
  	var _this = this;
    CameraPreview.takePicture(function(imgData){

    	//save pic to local storage
     	var pic = 'data:image/jpeg;base64,' + imgData;
     	var report = _this.gVars.getCurrentReport();
     	report.image = pic;
     	_this.gVars.updateCurrentReport(report);

      //push us to the correct next page
      if(report.reportType == "car") { _this.navCtrl.push(FormCarPage, {});
      } else if (report.reportType == "pothole") { _this.navCtrl.push(AddInfoPage, {});
      } else { alert("ERROR: No Report Type Selected!"); }

    });
  }

  private flashOn = false;
  toggleFlash(){
  		console.log("toggling flash!");
      this.flashOn =  !this.flashOn;
      //if(this.flashOn) {CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.OFF);}
      //else {CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.ON);}
      if(this.flashOn) {this.gVars.presentToast('flash is now ON');}
      else {this.gVars.presentToast('flash is now OFF');}

  }

}
