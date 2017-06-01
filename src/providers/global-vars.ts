import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  This provider handles the storage of the report being generated locally.
  The app persists data about the current report between pages by saving changes in a JSON object named  'currentReport',

  Whenever data about the current report is needed, the page call call getCurrentReport() to grab the object (such as checking what
  category the current report is by calling getCurrentReport().reportType), and can save updates to the current report by editing
  their local copy of the JSON object, then replacing the one in storage with it by calling updateCurrentProfile(newJSONobject).


  In addition, this provider can store methods that will be needed across several pages, such as the presentToast() method that
  calls a simple informational popup.
*/

@Injectable()
export class GlobalVars {


  constructor(public toastCtrl: ToastController) {
    console.log('GlobalVars Provider Started');
  }

  /**
   * Creates a dead-simple blank report object that will be filled in later.
   */
  public createCurrentReport() {
  	var report = {
      reportType: null,
    };

  	localStorage.setItem('currentReport', JSON.stringify(report));
  }

  /**
   * Returns the current report we are working on.
   * @return {JSON} a JSON object containing the information in the current report.
   */
  public getCurrentReport() {
  	return JSON.parse(localStorage.getItem('currentReport'));
  }

  /**
   * Replace the report saved in storage with the passed object, presumably a more updated report.
   * @param {JSON} updatedReport - the updated report object, containing more recent information than the one in storage.
   */
  public updateCurrentReport(updatedReport:JSON) {
  	localStorage.setItem('currentReport', JSON.stringify(updatedReport));
  }


  /*Unused Methods*/

  /*
  Currently PicFix does not ask for any personally identifying information.
  However, in the event this functionality is needed, we have created scaffolding that would make storing
  that information simple, and consistent with the way an in-progress report is already locally stored.
  */

  /**
   * Create a blank profile object, to be filled in later.
   */
  public createProfile() {
    var profile = {
      userInfo: {
        firstName : "",
        lastName : "",
        email : ""
      }, 
      profilePic: null
    }

    localStorage.setItem('profile', JSON.stringify(profile));
  }

  /**
   * Returns the current user profile information.
   * @return {JSON} a JSON object containing the information.
   */
  public getCurrentProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  /**
   * Replace the current user profile saved in storage with the passed object, presumably a more updated user profile.
   * @param {JSON} updatedProfile - the updated profile object, containing more recent information than the one in storage.
   */
  public updateCurrentProfile(updatedProfile:JSON) {
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
  }

  /**
   * Checks if there is a user profile saved locally.
   * @return {Boolean} if there is a profile saved in local storage currently.
   */
  public profileExists() {
    if (localStorage.getItem('profile') == null) {
      return false
    }
    else {
      return true;
    }
  }


  /**
   * Present a non-obtrusive informational popup at the top of the screen with the given text.
   * @param {String} text - the message to display.
   */
  public presentToast(text:string) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 4000,
        position: 'top'

      });
      toast.present();
      console.log('toaster got called');
    }

}
