import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddInfoPage } from '../add-info/add-info';
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
  public valueLicensePlate: string;
  public valueLicenseState: string;
  public valueVehicleMake: string;
  public valueVehicleColor: string;

  time: string;

  timeOpts: { title: string, subTitle: string };


constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public oData :  OlprData) {
  this.timeOpts = {
      title: 'Length of time parked',
      subTitle: 'Select time'
    };
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');

    var previewImage = document.getElementById('formPicture') as HTMLImageElement;



	  var report = this.gVars.getCurrentReport();
    previewImage.src = report.images;
    var _this = this;
    this.oData.getData(report.images).then(function(response) {
      var dataObj = JSON.parse(response.toString());
      if(dataObj.results[0] != null && dataObj.results[0].plate != null) {
            alert("License Plate info found [" + dataObj.results[0].plate + "], auto-filling form...");
            _this.autofillForm(dataObj.results[0]);
      } else {
        alert("No License Plate info found. Please retake the picture or fill out the form manually.");
      }
      //this.autofillForm(dataObj);
      //console.log("----------------------");
      //console.log(response.toString());
      //console.log("----------------------");
      //console.log(dataObj.results[0].plate);
      });


  }



  goToPothole() {
    //this.navCtrl.push(PotholePage, {});
  }


  goToAddInfo() {
    this.navCtrl.push(AddInfoPage, {});
  }

  //takes in an OLPR data form, sets form fields to that info.
  autofillForm(data) {
    console.log("autofilling form");
    //(<HTMLInputElement>document.getElementById("elementLicensePlate")).value = data.plate;
    this.valueLicensePlate = data.plate.toUpperCase();
    this.valueLicenseState = data.region.toUpperCase();
    this.valueVehicleMake = data.vehicle.make[0].name.toUpperCase();
    this.valueVehicleColor = data.vehicle.color[0].name.toUpperCase();

  }

  stpSelect() {
    console.log('STP selected');
  }




  }
