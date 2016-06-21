'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Teams
 * @description
 * # Teams
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Teams', function ($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + 'teams');
    var channels = $firebaseArray(ref);

    // Public API here
    return channels;
  });
