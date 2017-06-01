import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';



/*
  Simple page containing editable fields for user information.
  On exit, the data in the fields is stored in memory.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  firstName:string;
  lastName:string;
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gVars: GlobalVars) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad ProfilePage');

    var profile = this.gVars.getCurrentProfile();
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.email = profile.email;
  }

  ionViewWillLeave() {
    if (!this.gVars.profileExists()) {
      this.gVars.createProfile()
    }
    var profile = this.gVars.getCurrentProfile();

    profile.firstName = this.firstName;
    profile.lastName = this.lastName;
    profile.email = this.email;

    this.gVars.updateCurrentProfile(profile);

    console.log('HAVE A PROFILE');
    console.log('FIRST NAME: ' + profile.firstName);
    console.log('LAST NAME: ' + profile.lastName);
    console.log('EMAIL: ' + profile.email);

  }

}
