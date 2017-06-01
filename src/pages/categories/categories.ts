import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { DescriptionsPage } from '../descriptions/descriptions';
import { GlobalVars } from '../../providers/global-vars'
import { MyReportsPagePage } from '../my-reports/my-reports';

/*
  Page where user selects the type of report they will be making.
  This page also creates the initial report object.
  */

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  	constructor(public navCtrl: NavController, public gVars:GlobalVars) {
  }

  //called by the category buttons, 
  //will let us know which type of report was selected

  goToCamera(reportType:String) {
    //create the report
    this.gVars.createCurrentReport();
    var report = this.gVars.getCurrentReport();
    
    //update said report with the report type
    report.reportType = reportType;
    this.gVars.updateCurrentReport(report);

    //go to camera.
  	this.navCtrl.push(CameraPage, {});
  }

  /*currently, there is no way to view the descriptions
  of the types of reports.
  Still, the page is filled out & functional and can be integrated if wanted.*/  
	goToDescriptions() {
		this.navCtrl.push(DescriptionsPage, {});
	}

}
