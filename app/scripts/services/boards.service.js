'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.boards
 * @description
 * # Boards
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Boards', function ($firebaseArray, $firebaseObject, FirebaseUrl) {
    var boardsRef = new Firebase(FirebaseUrl + 'boards');
    var boards = $firebaseArray(boardsRef);

    return {
      forUser: function(userId) {
        return $firebaseArray(boardsRef.orderByChild("uid").equalTo(userId));
      },

      all: boards
    };

  });
