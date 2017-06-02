## Overview

PicFix is a picture-based reporting app that allows people to report city issues (e.g. potholes, abandoned vehicles, graffiti) by taking pictures.

PicFix makes the reporting process faster and easier by collecting the information in smart ways since pictures already contain the majority of the information a city needs in order to respond to issues.

Technologies such as image recognition and GPS location services scrape the necessary information from the photo and are used to autofill the form for the user. Instead of having to manually enter information in every form field, users only have to look over the report and submit.

## Project Explainer Video
[![](https://img.youtube.com/vi/ZWE0SiLXhxw/0.jpg)](https://www.youtube.com/watch?v=ZWE0SiLXhxw&feature=youtu.be)

## GIF Demonstration of Submitting a Report
![](imgs/fullReport.gif)

## GIF Demonstration of Viewing my Reports
![](imgs/myReports.gif)


## Leveraged Frameworks

PicFix is built with the [Ionic Framework](https://ionicframework.com/) v2. Ionic is great for building applications across different platforms (e.g. iOS, Android) by using a code base built on Angular2 and TypeScript. Ionic also has a strong, active community which is useful for debugging issues.

Because mobile webforms don't have the desired native camera accessibility (the ability to integrate the camera view directly into the HTML), Ionic was also chosen for its ability to access the native camera functionality.

[Firebase](https://firebase.google.com/) was used as a local, accessible database to demonstrate that the information in the reports could be successfully sent to another location.

[Open Automatic License Plate Recognition (oalpr)](http://www.openalpr.com/cloud-api.html) was the image recognition API used to process the photos in the "Illegally Parked Car" report.

## Installation

Install Node.js [here](https://nodejs.org/en/)

Run `npm install` to ensure all node packages are installed.

Depending on which platform you will be building for (e.g. website, iOS, Android) the installation will be slightly different in terms of what you need for development. Go [here](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/) for Android and [here](https://cordova.apache.org/docs/en/7.x/guide/platforms/ios/) for iOS.

Install Ionic with: `npm install -g cordova ionic`

* To install the dependencies and plugins used in your project, run the following command: `ionic state restore`

If you're new to Ionic, [here](https://ionicframework.com/docs/intro/tutorial/) is a great tutorial for getting started.

Install the cordova plugins you may need for your project.

## API Reference

License plate recognition is powered by [openalpr](http://www.openalpr.com/cloud-api.html).

Google Maps (API [here](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)) and geolocation integration was guided by [this](https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/) tutorial.


Firebase integration (API [here](https://firebase.google.com/docs/reference/js/)) was guided by [this](https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/) tutorial.

We have included our API keys in our existing project but they may not work in the future so please acquire and use your own if you run into issues.

## Tests

To constantly view changes, use the following command in your terminal: `ionic run ios -l -c` (iOS platform example)

* `-l` is `livereload` which allows you to view changes that automatically update in the app without having to constantly stop and start the `ionic run` command.
* `-c` is `console.log` which allows you to view `console.log` statements for debugging purposes.

## Contributors

Feel free to contribute to PicFix!

**Admin:** Sam Cochrane (samueldc@uw.edu)

**Support:** Marisa Nanakul (mnanakul@uw.edu)
