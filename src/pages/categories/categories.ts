import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CameraPage } from '../camera/camera';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})


  export class CategoriesPage {
	pushPage;
  	constructor(public navCtrl: NavController) {
  		this.pushPage = CategoriesPage;
  }

  goToCamera(reportType:string) {
	this.navCtrl.push(CameraPage, {});
}

}
