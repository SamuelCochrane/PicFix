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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

    CameraPreview.startCamera({x: 50, y: 50, width: window.screen.width - 100, height: window.screen.height - 100, camera: "front", toBack: false, tapPhoto: true, previewDrag: false});

  }

}
