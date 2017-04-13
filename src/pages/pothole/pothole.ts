import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddInfoPage } from '../add-info/add-info;
import { GlobalVars } from '../../providers/global-vars'

/*
  Generated class for the Pothole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pothole',
  templateUrl: 'pothole.html'
})


	export class PotholePage {
 		pushPage;
  		constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
  			this.pushPage = PotholePage;

	}
}

goToAddInfo() {
	this.navCtrl.push(AddInfoPage, {});

}
