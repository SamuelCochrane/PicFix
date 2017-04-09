import { Injectable } from '@angular/core';


/*
  Generated class for the GlobalVars provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalVars {
  
  public reportPath: any;

  constructor() {
    console.log('Hello GlobalVars Provider');
    this.reportPath = "";
  }

  setReportPath(value:String) {
  	this.reportPath = value;
  }

  getReportPath() {
  	return this.reportPath;
  }

}
