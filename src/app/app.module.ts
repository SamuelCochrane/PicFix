import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FormPage } from '../pages/form/form';

import { PotholePage} from '../pages/pothole/pothole';
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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CameraPage,
    CameraConfirmPage,
    FormPage,
    PotholePage,
    AddInfoPage,
    CategoriesPage,
    ProfilePage,
    DescriptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CameraPage,
    CameraConfirmPage,
    FormPage,
    PotholePage,
    AddInfoPage,
    CategoriesPage,
    ProfilePage,
    DescriptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalVars,
    OlprData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
