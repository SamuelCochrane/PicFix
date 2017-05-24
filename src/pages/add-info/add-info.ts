import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalVars } from '../../providers/global-vars';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';



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

  finalReport: FirebaseListObservable<any>;


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars, public geolocation: Geolocation, public alertCtrl: AlertController, af: AngularFire) {
  		this.pushPage = AddInfoPage;
      this.finalReport = af.database.list('/finalReport');

  }

  ionViewDidLoad(){
    var previewImage = document.getElementById('formPicture2') as HTMLImageElement;

    var report = this.gVars.getCurrentReport();
    previewImage.src = report.images;

    this.loadMap();

  }

  public geoloc;
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      this.geoloc = position.coords;
      //alert('yay');

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //alert('woo')
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable : false,
        navigationControl : false,
        scrollwheel : false
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
  //get current report
  //~~~~report.anonymous = true, report.geolocation {Lat : X, Long : X}, report.additionalComments = X
  //update report in memory

  //send data to firebase - data = this.gVars.getCurrentReport()

  // this.showSubmitAlert();
  var report = this.gVars.getCurrentReport();

  var geolocation
  if(this.geoloc != null) {
    geolocation = {
      Lat : this.geoloc.latitude,
      Lng : this.geoloc.longitude
    }
  } else {
    geolocation = {
      Lat : "null",
      Lng : "null"
    }
  }

  report.additionalInfo = {
    geolocation,
    additionalComments : this.addInfoComments + "",
    anonymous : false //TODO: make this do the thing
  }

  this.gVars.updateCurrentReport(report);




  var  finalReport;

  if (report.reportType == "car") {  
    finalReport = {
            additionalInfo : report.additionalInfo,
            carInfo : report.carInfo,
            image : report.image,
            reportType : report.reportType
    }
  } else {
    finalReport = {
            additionalInfo : report.additionalInfo,
            image : report.image,
            reportType : report.reportType
    }
  }




  let submitAlert = this.alertCtrl.create({
    title: 'Thank You!',
    message: "Your report has been sent to the city!",
    buttons: [
      {
        text: 'OK',
        handler: data => {
          this.finalReport.push(finalReport);
        }
      }
    ]
  });
  submitAlert.present();


	this.navCtrl.popToRoot(/*{
    param1: 'submittedReport'

  }*/);

  console.log("report sent to firebase");


}

addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Information!</h4>";

  this.addInfoWindow(marker, content);

}

addInfoWindow(marker, content){

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
}
