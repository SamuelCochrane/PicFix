import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PotholePage } from '../pothole/pothole';
import { GlobalVars } from '../../providers/global-vars'
import { OlprData } from '../../providers/olpr-data'

/*
  Generated class for the Form page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form-car',
  templateUrl: 'form-car.html'
})
export class FormCarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public oData :  OlprData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');

    var previewImage = document.getElementById('formPicture') as HTMLImageElement;


	  var report = this.gVars.getCurrentReport();
    previewImage.src = report.images;

    this.oData.getData(report.images).then(function(response) {
      alert("License Plate info found, auto-filling form");
      //var dataObj = JSON.parse(response[0]);
      //this.autofillForm(dataObj);
      console.log(response[0]);
      });


  }


  goToPothole() {
    this.navCtrl.push(PotholePage, {});
  }


  //takes in an OLPR data form, sets form fields to that info.
  autofillForm(data) {
    //TODO: set form fields.
  }
}
