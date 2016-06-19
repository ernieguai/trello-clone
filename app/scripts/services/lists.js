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
    //var boards = $firebaseArray(boardsRef);

    return {
      forBoard: function (boardId) {
        return $firebaseArray(listsRef.child(boardId));
      }//,
      // forUser: function (userId) {
      //   return $firebaseArray(listsRef).child(userId);
      // },
      // forTeam: function (teamId) {
      //   return $firebaseArray(listsRef).child(teamId);
      // }
    };

  });
