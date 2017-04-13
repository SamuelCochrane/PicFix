import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CameraPage } from '../camera/camera';

import { DescriptionsPage } from '../descriptions/descriptions';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})


  export class CategoriesPage {
	pushPage;
  	constructor(public navCtrl: NavController) {
  		this.pushPage = CategoriesPage;
  }

  goToCamera() {
	this.navCtrl.push(CameraPage, {});
}

	goToDescriptions() {
		this.navCtrl.push(DescriptionsPage, {});
	}

 /*
  goToCamera(reportType:string) {
	this.navCtrl.push(CameraPage, {});
}
*/

}
