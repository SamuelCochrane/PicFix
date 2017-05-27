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
  Generated class for the AddInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html'
})
export class AddInfoPage {
 	pushPage;
  public addInfoComments: " ";

  public af: any;
  public finalReport: FirebaseListObservable<any>;


  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public geolocation: Geolocation, public alertCtrl: AlertController, af: AngularFire) {
    this.pushPage = AddInfoPage;
    this.finalReport = af.database.list('/finalReport');

    this.af = af;
  }

  ionViewDidLoad() {
    var previewImage = document.getElementById('formPicture2') as HTMLImageElement;

    var report = this.gVars.getCurrentReport();
    previewImage.src = report.image;

    this.loadMap();

  }

  public geoloc;
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.geoloc = position.coords;
      //alert('yay');

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //alert('woo')
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        navigationControl: false,
        scrollwheel: false
      }
      //alert('yeeee');
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();
      //alert('uhhuuuhh');
    }, (err) => {
      alert(err.code + " " + err.message);
    });
  }



  submitReport() {
    var report = this.gVars.getCurrentReport();

    var geolocation
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

    report.additionalInfo = {
      geolocation,
      additionalComments: this.addInfoComments + "",
      anonymous: false //TODO: make this do the thing
    }

    this.gVars.updateCurrentReport(report);




    var finalReport;

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
      console.log('Uploaded a base64 string!');


      storage.child(storage_url).getDownloadURL().then(responseURL => {
        finalReport.image = responseURL;
        console.log("FinalReport's image");
        console.log(finalReport.image);
        console.log("Response URL");
        console.log(responseURL);


        reportList.push(finalReport).then(function(error) {
          if (error) {
            console.log("error: " + error)
          } else {
            console.log("report sent to firebase")
          }
        });
      });
    })

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

    this.navCtrl.popToRoot(/*{
    param1: 'submittedReport'

  }*/);
  }
  //  firebase auth stuff: if request.auth != null
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  showSubmitAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thank You!',
      subTitle: 'Your report has been submitted!',
      buttons: ['OK']
    });
    alert.present();
  }

  confirmPic() {
    this.navCtrl.push(CameraConfirmPage);

  }
}
