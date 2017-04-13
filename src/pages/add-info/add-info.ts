import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalVars } from '../../providers/global-vars'


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
  	constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
  		this.pushPage = AddInfoPage;
  }



shareReport() {
	this.navCtrl.push(HomePage, {
    param1: 'submittedReport'

  });

}
}
