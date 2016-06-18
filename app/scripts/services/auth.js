'use strict';

/**
 * @ngdoc service
 * @name frinvoiceApp.auth
 * @description
 * # auth
 * Factory in the frinvoiceApp.
 */
angular.module('frinvoiceApp')
  .factory('Auth', function ($firebaseAuth, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref);

    return auth;
  });
