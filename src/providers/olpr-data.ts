import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import request from 'request';
import requestPromise from 'request-promise';

declare var require: any;

/*
This global method encapsulates calls to the OALPR API, the API responsible for reading information from
pictures of cars, and returning information such as license plate, color of car, and more.
*/

@Injectable()
export class OlprData {

	private secretKey: 'sk_df7b1684aa2e299660d8c087'; /* key used to access the OALPR API. 
														 You can generate your own key by creating an account at https://cloud.openalpr.com/
														 This key is for a trial account and may no longer be functional at your point in time. */

	
	constructor(public http: Http) {
	    console.log('OlprData Provider Started');
  	}




  	/**
	 * Takes in an image (stringified) and returns data from the API 
	 * @param {String} img - the image to be analyized, stringified jpeg 
	 * @return {JSON} a JSON object containing the response from the API
	 */
	getData(img:String) {	
		return new Promise(function(resolve, reject) {
			var dataString = img.substring(22); //cut off the leading "data type" info, leaving just the raw stringified pic [removes the leading string 'data:image/jpeg;base64,']

			var options = {
			    url: 'https://api.openalpr.com/v2/recognize_bytes?secret_key='+this.secretKey+'&recognize_vehicle=1&country=us&return_image=0&topn=2',
			    method: 'POST',
			    body: dataString
			};

			requestPromise(options, callback); //make the API call.


			function callback(error, response, body) {
			    //successfully recieved data back from the API.
			    //note: this includes 'no license plate found' messages.
			    if (!error && response.statusCode == 200) {
			        
			    	//convert the recieved response (a JSON string) into a full JSON object
			        var bodyObj = JSON.parse(body);
					

			       //quick validation of internal integrity
			       if(bodyObj.results != null) {
			        resolve(body); //return API results.
			       }

			    //recieved an error communicating with the API
			    } else {
			    	console.log('ERROR ' + error);
			    	reject(null);
			    }
			}	
	  });
	}
}

/* EXAMPLE OALPR OUTPUT
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
		"vehicle_region": {
			"y": 118, 
			"x": 0, 
			"height": 1200, 
			"width": 1200
			}, 
        "region": "ky", 
        "plate_index": 0, 
        "processing_time_ms": 16.217129, 
        "candidates": [
       	{
        	"matches_template": 0, 
        	"plate": "9542DX", 
        	"confidence": 86.038353
        }, 
        {
        	"matches_template": 1, 
        	"plate": "954ZDX", 
        	"confidence": 81.582253
        }, 
        {
        	"matches_template": 0, 
        	"plate": "954DX", 
        	"confidence": 78.650307
        },
        {
        	"matches_template": 0, 
        	"plate": "9543DX", 
        	"confidence": 77.363083
        }, 
        {
        	"matches_template": 1, 
        	"plate": "954XDX", 
        	"confidence": 77.155037
        }, 
        {
        	"matches_template": 1, 
        	"plate": "954CDX", 
        	"confidence": 77.030731
        },
        {
        	"matches_template": 0, 
        	"plate": "95420X", 
        	"confidence": 74.436172
        }, 
        {
        	"matches_template": 0, 
        	"plate": "9542X", 
        	"confidence": 72.510696
        }, 
        {
        	"matches_template": 0, 
        	"plate": "952DX", 
        	"confidence": 71.410133
        },
        {
        	"matches_template": 0, 
        	"plate": "954Z0X", 
        	"confidence": 69.980072
        }
        ], 
        "coordinates": [
        {
        	"y": 873, 
        	"x": 499
        }, 
        {
        	"y": 875, 
        	"x": 753
        }, 
        {	"y": 1022, 
        	"x": 751
        }, 
        {
        	"y": 1020, 
        	"x": 502
        }
        ], 
        "matches_template": 1,
        "requested_topn": 10
        }
    ], 
    "credits_monthly_used": 11, 
    "version": 2, 
    "credits_monthly_total": 1500, 
    "error": false, 
    "regions_of_interest": [
      	{
       	"y": 0, 
       	"x": 0, 
       	"height": 1600, 
       	"width": 1200
       	}
    ], 
    "credit_cost": 1
}

*/