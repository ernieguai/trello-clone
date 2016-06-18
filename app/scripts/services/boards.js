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

    var Boards = {

      createProfile: function (uid, user){
        return boardsRef.child(uid).set(user);
      },

      getProfile: function (uid) {
        return $firebaseObject(boardsRef.child(uid));
      },


      // TODO: remove this method
      getFirstName: function (uid) {
        return Boards.getProfile(uid).$loaded().then(function (profile) {
          return profile.firstName;
        });
      },

      getName: function (uid) {
        return Boards.getProfile(uid).$loaded().then(function (profile) {
          return profile.name;
        });
      },

      all: boards
    };

    return Boards;

  });
