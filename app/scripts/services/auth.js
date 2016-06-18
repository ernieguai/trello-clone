'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.auth
 * @description
 * # auth
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Auth', function ($firebaseAuth, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

    return auth;
  });
