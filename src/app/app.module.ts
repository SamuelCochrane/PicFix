import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FormCarPage } from '../pages/form-car/form-car';

import { AddInfoPage} from '../pages/add-info/add-info';
import { CategoriesPage } from '../pages/categories/categories';
import { ProfilePage } from '../pages/profile/profile';

import { CameraPage } from '../pages/camera/camera';
import { CameraConfirmPage } from '../pages/camera-confirm/camera-confirm';

import { DescriptionsPage } from '../pages/descriptions/descriptions';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalVars } from '../providers/global-vars';
import { OlprData } from '../providers/olpr-data';

// import angular
import { AngularFireModule } from 'angularfire2';

import { Geolocation } from '@ionic-native/geolocation';




export const firebaseConfig = {
    apiKey: "AIzaSyAth5ukrQdumsPTAv4BtBlxvufx-Jje3zQ",
    authDomain: "picfix-b2a74.firebaseapp.com",
    databaseURL: "https://picfix-b2a74.firebaseio.com",
    projectId: "picfix-b2a74",
    storageBucket: "picfix-b2a74.appspot.com",
    messagingSenderId: "242758206804"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CameraPage,
    CameraConfirmPage,
    FormCarPage,
    AddInfoPage,
    CategoriesPage,
    ProfilePage,
    DescriptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CameraPage,
    CameraConfirmPage,
    FormCarPage,
    AddInfoPage,
    CategoriesPage,
    ProfilePage,
    DescriptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalVars,
    Geolocation,
    OlprData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})


export class AppModule {}
