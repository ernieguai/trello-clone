'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:TimesheetsCtrl
 * @description
 * # TimesheetsCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
  .controller('TimesheetsCtrl', function (projects, timesheets) {

    var timesheetsCtrl = this;

    timesheetsCtrl.projects = projects;
    timesheetsCtrl.timesheets = timesheets;

    // TODO: make this an empty array or object with a list of hours for a week
    // TODO: gray out these inputs if an invoice for this timsheet and client has already been sent
    timesheetsCtrl.timesheet = '';
    // TODO: make this time based -- bring in a bower package for time
    timesheetsCtrl.updateTimeSheet = function () {
      if (timesheetsCtrl.timesheet.length > 0) {
        // TODO: need to set this to only the current timesheet for the date specified!
        timesheetsCtrl.timesheets.$add({
          // TODO: do we need profile information in this view to send the user id with the timesheet that is created?
          //uid: profile.$uid
          // TODO: change body to time, monday through friday...should this be stored as an array? 1 number for each day?
          body: timesheetsCtrl.timesheet,
          timestamp: Firebase.ServerValue.TIMESTAMP
        }).then(function () {
          return;
        });
      }
    };

  });
