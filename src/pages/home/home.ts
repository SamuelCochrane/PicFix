import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parameter1



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parameter1 = this.navParams.get('param1');
  }

goToCategoriesPage() {
	this.navCtrl.push(CategoriesPage, {});
}

goToProfilePage() {
	this.navCtrl.push(ProfilePage, {});
}

ionViewDidLoad() {
  console.log("PARAM 1 WAS: " + this.parameter1);
  if (this.parameter1 == "submittedReport") {
    // launch modal popup
    //clear the backstack
  }



}

}
