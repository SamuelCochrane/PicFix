import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parameter1



  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
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

// ionViewWillEnter() {
//   this.presentToast()
// }
//
// presentToast() {
//   let toast = this.toastCtrl.create({
//     message: 'User was added successfully',
//     duration: 3000,
//
//   });
//   toast.present();
// }


}
