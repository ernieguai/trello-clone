'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Lists
 * @description
 * # Lists
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Lists', function ($firebaseArray, FirebaseUrl) {
    var listsRef = new Firebase(FirebaseUrl + 'lists');

    return {
      forBoard: function (boardId) {
        return $firebaseArray(listsRef.child(boardId));
      }
    };

  });
