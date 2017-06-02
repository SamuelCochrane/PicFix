import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddInfoPage } from '../add-info/add-info';
import { GlobalVars } from '../../providers/global-vars';
import { OlprData } from '../../providers/olpr-data';
import { AlertController } from 'ionic-angular';

import { CameraConfirmPage } from '../camera-confirm/camera-confirm';

import { LoadingController } from 'ionic-angular';


/*
  This page handles getting information about a car.
  It will call the OALPR API to grab information from the picture,
  and has fields for data such as License Plate # & length of time parked.
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
    public time: string;
    private timeOpts: { title: string, subTitle: string };


    constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public oData :  OlprData, public alertCtrl: AlertController, public loading: LoadingController) {
      this.timeOpts = {
        title: 'Length of time parked',
        subTitle: 'Select time'
      };
    }

    ionViewDidLoad() {
      //set image to one in report
      var previewImage = document.getElementById('formPicture') as HTMLImageElement;
      var report = this.gVars.getCurrentReport();
      previewImage.src = report.image;


      //create a popup while we wait for response from OALPR
      let loader = this.loading.create({
        content: 'Scanning image...',
      });
      loader.present();

      var _this = this;
      this.oData.getData(report.image).then(function(response) {
        //got response, dismiss the loading popup
        loader.dismiss();
        //parse the response
        var dataObj = JSON.parse(response.toString());
        if(dataObj.results[0] != null && dataObj.results[0].plate != null) {
          //valid data found in result
          _this.showOlprAlert(dataObj.results[0].plate); //show the success alert
          _this.autofillForm(dataObj.results[0]); //autofill form fields
        } else {
          _this.showNoOlprAlert();
        }
      });
    }

    //add this page's info to the report, 
    //then go to the next form page
    goToAddInfo() {

      var report = this.gVars.getCurrentReport();
      report.carInfo = {
        licensePlate : this.valueLicensePlate,
        licenseState : this.valueLicenseState,
        vehicleMake : this.valueVehicleMake,
        vehicleColor : this.valueVehicleColor,
        time : this.time
      }
      this.gVars.updateCurrentReport(report);

      this.navCtrl.push(AddInfoPage, {});
    }

    //takes in an OLPR data form, sets form fields to that info.
    autofillForm(data) {
      this.valueLicensePlate = data.plate.toUpperCase();
      this.valueLicenseState = data.region.toUpperCase();
      this.valueVehicleMake = data.vehicle.make[0].name.toUpperCase();
      this.valueVehicleColor = data.vehicle.color[0].name.toUpperCase();
    }

    //show an alert that no license plate info was found
    showNoOlprAlert() {
      let alert = this.alertCtrl.create({
        title: 'No license info found.',
        subTitle: 'Please retake the picture or fill out the form manually.',
        buttons: ['OK']
      });
      alert.present();
    }

    /**
     * show  a success alert
     * @param {String} licensePlate - the license plate we found in the data.
     */
    showOlprAlert(licensePlate:String) {
      let alert = this.alertCtrl.create({
        title: 'License info found!',
        subTitle: 'Found license plate [' + licensePlate + '], autofilling form...',
        buttons: ['OK']
      });
      alert.present();
    }

   /**
   * Called by tapping on the report image.
   * will send us to the confirm image page, where we can accept or retake this picture.
   */
    confirmPic() {
      this.navCtrl.push(CameraConfirmPage);
    }

  }
