import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Descriptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-descriptions',
  templateUrl: 'descriptions.html'
})
export class DescriptionsPage {
	pushPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.pushPage = DescriptionsPage;
  }

}
