import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CameraConfirmPage } from '../camera-confirm/camera-confirm';
import { GlobalVars } from '../../providers/global-vars';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';

declare var google;

/*
  Controller for the Additional Info page, the last page of the report, 
  where the user will add their location, any additional comments,
  and finally submit the report. 
*/
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html'
})
export class AddInfoPage {
  private addInfoComments : " ";
  private af: any;
  private finalReport: FirebaseListObservable<any>;
  @ViewChild('map') mapElement: ElementRef;
  private map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public geolocation: Geolocation, public alertCtrl: AlertController, af: AngularFire) {
    this.finalReport = af.database.list('/finalReport');
    this.af = af;
  }

  /*Called the first time the page is loaded*/
  ionViewDidLoad() {
    //set the image on the page to the one saved in the report.
    var previewImage = document.getElementById('formPicture2') as HTMLImageElement;
    var report = this.gVars.getCurrentReport();
    previewImage.src = report.image;

    //load the Google Maps widget
    this.loadMap();

  }


  public geoloc;
  /*
   * Function in charge of loading the Google Maps widget
   */
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.geoloc = position.coords; //store our position outside the function, for use elsewhere

      //create the map with arguments
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        navigationControl: false,
        scrollwheel: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //add a map marker to our current position
      this.addMarker();

    }, (err) => {
      alert(err.code + " " + err.message);
    });
  }

  /*
   * add a map marker to the center of the current map instance.
   */
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Here!</h4>";

  }

  /*
   * Adds the information on the current form page to the report,
   * then sends the completed report to the server.
   */
  submitReport() {
    //update report in storage with this page's information
    var report = this.gVars.getCurrentReport();

    var geolocation; //properly formated container for our coordinates.
    if (this.geoloc != null) {
      geolocation = {
        Lat: this.geoloc.latitude,
        Lng: this.geoloc.longitude
      }
    } else {
      geolocation = {
        Lat: "null",
        Lng: "null"
      }
    }

    //set additional comments to the report type if the user didn't add anything.
    if(this.addInfoComments == null) {
      this.addInfoComments = report.reportType;
    }

    //add these things to our local report object, 
    //then replace the report in storage with this newer report.
    report.additionalInfo = {
      geolocation,
      additionalComments: this.addInfoComments + ""
      // anonymous: null
    }
    this.gVars.updateCurrentReport(report);


    //structure the final report object that will be sent to the server
    var finalReport;

    //include car info in the report if this was a car report, otherwise skip it.
    if (report.reportType == "car") {
      finalReport = {
        additionalInfo: report.additionalInfo,
        carInfo: report.carInfo,
        image: report.image,
        reportType: report.reportType,
        createdTime: firebase.database.ServerValue.TIMESTAMP
      }
    } else {
      finalReport = {
        additionalInfo: report.additionalInfo,
        image: report.image,
        reportType: report.reportType,
        createdTime: firebase.database.ServerValue.TIMESTAMP
      }
    }


    let storage_url = 'images/' + (new Date()).getTime() + '.jpeg';

    let reportList = this.finalReport;

    let storage = firebase.storage().ref();
    storage.child(storage_url).putString(report.image, 'data_url').then(function(snapshot) {
      
      storage.child(storage_url).getDownloadURL().then(responseURL => {
        finalReport.image = responseURL;
        // console.log("FinalReport's image");
        // console.log(finalReport.image);
        // console.log("Response URL");
        // console.log(responseURL);


        reportList.push(finalReport).then(function(error) {
          if (error) {
            console.log("error: " + error)
          } else {
            console.log("Report sent to firebase");
          }
        });
      });
    })

    //create a thankyou message
    this.showSubmitAlert();

    //push the user back to the homepage.
    this.navCtrl.popToRoot();
  }

  /*
   * Creates a 'thanks for submitting' popup
   */
  showSubmitAlert() {
    let submitAlert = this.alertCtrl.create({

      title: 'Thank You!',
      message: "Your report has been sent to the city!",
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    submitAlert.present();
  }


  /*
   * Called by tapping on the report image.
   * will send us to the confirm image page, where we can accept or retake this picture.
   */
  confirmPic() {
    var report = this.gVars.getCurrentReport();
    if (report.reportType == "car") {
      this.navCtrl.push(CameraConfirmPage, {passedFrom : "carAddInfo"});
    }
    else {
      this.navCtrl.push(CameraConfirmPage);
    }
  }

}
