'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.timesheets
 * @description
 * # timesheets
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Timesheets', function ($firebaseArray, FirebaseUrl) {
    var timesheetsRef = new Firebase(FirebaseUrl + 'timesheets');

    var timesheets = $firebaseArray(timesheetsRef);

    return timesheets;

    // TODO: return all timesheets - not just those for a single project....
    // TODO: return timesheets only for the date specified!!
    // return {
      // forProject: function (projectId) {
      //   return $firebaseArray(timesheetsRef.child(projectId));
      // }
    // };
  });
