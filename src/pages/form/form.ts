import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars'


/*
  Generated class for the Form page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');

    var previewImage = document.getElementById('formPicture') as HTMLImageElement;


	  var report = this.gVars.getCurrentReport();
    previewImage.src = report.images;
  }


}
