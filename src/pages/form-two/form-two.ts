import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars'

/*
  Generated class for the FormTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form-two',
  templateUrl: 'form-two.html'
})


	export class FormTwoPage {
 		pushPage;
  		constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
  			this.pushPage = FormTwoPage;

	}
}
