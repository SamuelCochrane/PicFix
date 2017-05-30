import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';
import { MyReportsPagePage } from '../my-reports/my-reports';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';



declare var cordova: any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  parameter1;
  // songs: FirebaseListObservable<any>;
  public options;




  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, af: AngularFire, private nativePageTransitions: NativePageTransitions) {
    this.parameter1 = this.navParams.get('param1');

    // this.songs = af.database.list('/songs');
  }


goToCategoriesPage() {
    this.navCtrl.push(CategoriesPage, {});
  }

goToReportsPage() {
	this.navCtrl.push(MyReportsPagePage, {});
}

// goToProfilePage() {
// 	this.navCtrl.push(ProfilePage, {});
// }

ionViewDidLoad() {
  console.log("PARAM 1 WAS: " + this.parameter1);
  if (this.parameter1 == "submittedReport") {
    //clear old report from memory
    localStorage.removeItem('currentReport');
    //clear the backstack
  }

//   cordova.plugins.diagnostic.isLocationAvailable(function(available){
//     console.log("Location is " + (available ? "available" : "not available"));
//   }, function(error){
//       console.error("The following error occurred: "+error);
//   });

//   cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
//     switch(status){
//         case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
//             console.log("Permission not requested");
//             break;
//         case cordova.plugins.diagnostic.permissionStatus.GRANTED:
//             console.log("Permission granted");
//             break;
//         case cordova.plugins.diagnostic.permissionStatus.DENIED:
//             console.log("Permission denied");
//             break;
//         case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
//             console.log("Permission permanently denied");
//             break;
//     }
// }, function(error){
//     console.error(error);
// });

  cordova.plugins.diagnostic.requestRuntimePermission(function(status){
    switch(status){
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            console.log("Permission granted to use the camera");
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            console.log("Permission to use the camera has not been requested yet");
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            console.log("Permission denied to use the camera - ask again?");
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
            break;
    }
}, function(error){
    console.error("The following error occurred: "+error);
}, cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION);
//   var permissions = cordova.plugins.permissions;
//   permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, function( status ){
//   if ( status.hasPermission ) {
//     console.log("Yes :D ");
//   }
//   else {
//     console.warn("No :( ");
//   }
// });



// permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, console.log('yay'), console.log('oh'));


}






 //  let options: NativeTransitionOptions = {
 //     direction: 'up',
 //     duration: 500,
 //     slowdownfactor: 3,
 //     slidePixels: 20,
 //     iosdelay: 100,
 //     androiddelay: 150,
 //     fixedPixelsTop: 0,
 //     fixedPixelsBottom: 60
 //    };
 //
 // this.nativePageTransitions.slide(options)
 //   .then(onSuccess)
 //   .catch(onError);







// example of adding a transition when pushing a new page

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
// addSong() {
//   let prompt = this.alertCtrl.create({
//     title: 'Song Name',
//     message: "Enter a name for this new song you're so keen on adding",
//     inputs: [
//       {
//         name: 'title',
//         placeholder: 'Title'
//       },
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Save',
//         handler: data => {
//           this.songs.push({
//             title: data.title
//           });
//         }
//       }
//     ]
//   });
//   prompt.present();
// }

// showOptions(songId, songTitle) {
//   let actionSheet = this.actionSheetCtrl.create({
//     title: 'What do you want to do?',
//     buttons: [
//       {
//         text: 'Delete Song',
//         role: 'destructive',
//         handler: () => {
//           this.removeSong(songId);
//         }
//       },{
//         text: 'Update title',
//         handler: () => {
//           this.updateSong(songId, songTitle);
//         }
//       },{
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       }
//     ]
//   });
//   actionSheet.present();
// }

// removeSong(songId: string){
//   this.songs.remove(songId);
// }

// updateSong(songId, songTitle){
//   let prompt = this.alertCtrl.create({
//     title: 'Song Name',
//     message: "Update the name for this song",
//     inputs: [
//       {
//         name: 'title',
//         placeholder: 'Title',
//         value: songTitle
//       },
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Save',
//         handler: data => {
//           this.songs.update(songId, {
//             title: data.title
//           });
//         }
//       }
//     ]
//   });
//   prompt.present();
// }

}
