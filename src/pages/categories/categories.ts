import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { DescriptionsPage } from '../descriptions/descriptions';
import { GlobalVars } from '../../providers/global-vars'


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  	constructor(public navCtrl: NavController, public gVars:GlobalVars) {
  }

  //goToCamera() {
  goToCamera(reportType:String) {

    //create the report
    this.gVars.createCurrentReport();
    var report = this.gVars.getCurrentReport();
    report.reportType = reportType;
    this.gVars.updateCurrentReport(report);

  	this.navCtrl.push(CameraPage, {});
  }

	goToDescriptions() {
		this.navCtrl.push(DescriptionsPage, {});
	}


  // goToCamera(reportType:string) {
  // }
}
