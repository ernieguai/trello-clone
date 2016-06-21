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
    var teamsRef = new Firebase(FirebaseUrl + 'teams');
    var teams = $firebaseArray(teamsRef);

    return {
      forUser: function(userId) {
        return $firebaseArray(teamsRef.orderByChild("uid").equalTo(userId));
      },

      all: teams
    };
  });
