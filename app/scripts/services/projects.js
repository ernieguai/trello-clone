'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.projects
 * @description
 * # projects
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Projects', function ($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + 'projects');
    var projects = $firebaseArray(ref);

    return projects;
  });
