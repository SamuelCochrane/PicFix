import { Injectable } from '@angular/core';


/*
  Generated class for the GlobalVars provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalVars {

  //public reportPath: any;

  constructor() {
    console.log('Hello GlobalVars Provider');
    //this.reportPath = "";
  }

  public createCurrentReport() {
  	var report = {
  		reporterInfo: {
  			firstName : "Slem",
  			lastName : "cerkrun"
  		},
  		images: {
  		},
  		otherInfo: {

  		}
  	}
  	localStorage.setItem('currentReport', JSON.stringify(report));
  }

  public getCurrentReport() {
  	return JSON.parse(localStorage.getItem('currentReport'));
  }

  public updateCurrentReport(updatedReport:JSON) {
  	localStorage.setItem('currentReport', JSON.stringify(updatedReport));
  }

  public createProfile() {
    var profile = {
      userInfo: {
        firstName : "",
        lastName : "",
        email : ""
      }
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  public getCurrentProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public updateCurrentProfile(updatedProfile:JSON) {
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
  }

  public profileExists() {
    if (localStorage.getItem('profile') == null) {
      return false
    }
  }



}
