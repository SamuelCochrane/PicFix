import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import request from 'request';
import requestPromise from 'request-promise';

declare var require: any;
/*
  Generated class for the OlprData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OlprData {

  constructor(public http: Http) {
    console.log('Hello OlprData Provider');


  }





	getData(img:String) {	
		return new Promise(function(resolve, reject) {
			var dataString = img.substring(22); //cut off the leading "data type" info, leaving just the stringified pic

			var options = {
			    url: 'https://api.openalpr.com/v2/recognize_bytes?secret_key=sk_df7b1684aa2e299660d8c087&recognize_vehicle=0&country=us&return_image=0&topn=10',
			    method: 'POST',
			    body: dataString
			};



			requestPromise(options, callback);

			function callback(error, response, body) {
			    if (!error && response.statusCode == 200) {
			        var bodyObj = JSON.parse(body);

			       //console.log(bodyObj.results[0]);
			       //console.log('//////////////');
			       //console.log(bodyObj.results[0].plate);

			       if(bodyObj.results != null) {
			        resolve(body);
			       }

			    } else {
			    	console.log('ERROR ' + error);
			    	reject(null);
			    }
			}
		
		
	  });
	}
}

/*
{
	"data_type": "alpr_results", 
	"epoch_time": 1493500437687, 
	"processing_time": 
	{
		"plates": 88.278915, 
		"total": 101.76900000078604
	}, 
	"img_height": 1600, 
	"img_width": 1200, 
	"results": [
	{
		"plate":"954ZDX", 
		"confidence": 81.582253, 
		"region_confidence": 49, 
		"vehicle_region": {"y": 118, "x": 0, "height":
            1200, "width": 1200}, 
            "region": "ky", "plate_index": 0, "processing_time_ms": 16.217129, "candidates":
            [{"matches_template": 0, "plate": "9542DX", "confidence": 86.038353}, {"matches_template": 1, "plate":
            "954ZDX", "confidence": 81.582253}, {"matches_template": 0, "plate": "954DX", "confidence": 78.650307},
            {"matches_template": 0, "plate": "9543DX", "confidence": 77.363083}, {"matches_template": 1, "plate":
            "954XDX", "confidence": 77.155037}, {"matches_template": 1, "plate": "954CDX", "confidence": 77.030731},
            {"matches_template": 0, "plate": "95420X", "confidence": 74.436172}, {"matches_template": 0, "plate":
            "9542X", "confidence": 72.510696}, {"matches_template": 0, "plate": "952DX", "confidence": 71.410133},
            {"matches_template": 0, "plate": "954Z0X", "confidence": 69.980072}], "coordinates": [{"y": 873, "x": 499}, 
            {"y": 875, "x": 753}, {"y": 1022, "x": 751}, {"y": 1020, "x": 502}], "matches_template": 1,
            "requested_topn": 10}], "credits_monthly_used": 11, "version": 2, "credits_monthly_total": 1500, "error":
            false, "regions_of_interest": [{"y": 0, "x": 0, "height": 1600, "width": 1200}], "credit_cost": 1}

            */