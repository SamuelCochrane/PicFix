import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  parameter1;
  songs: FirebaseListObservable<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, af: AngularFire) {
    this.parameter1 = this.navParams.get('param1');

    this.songs = af.database.list('/songs');
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
addSong() {
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.push({
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

showOptions(songId, songTitle) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons: [
      {
        text: 'Delete Song',
        role: 'destructive',
        handler: () => {
          this.removeSong(songId);
        }
      },{
        text: 'Update title',
        handler: () => {
          this.updateSong(songId, songTitle);
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeSong(songId: string){
  this.songs.remove(songId);
}

updateSong(songId, songTitle){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Update the name for this song",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: songTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.update(songId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

}
