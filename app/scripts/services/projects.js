'use strict';

/**
 * @ngdoc service
 * @name frinvoiceApp.projects
 * @description
 * # projects
 * Factory in the frinvoiceApp.
 */
angular.module('frinvoiceApp')
  .factory('Projects', function ($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + 'projects');
    var projects = $firebaseArray(ref);

    return projects;
  });
