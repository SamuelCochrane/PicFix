import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

goToCategoriesPage() {
	this.navCtrl.push(CategoriesPage, {});
}

goToProfilePage() {
	this.navCtrl.push(ProfilePage, {});
}

}
