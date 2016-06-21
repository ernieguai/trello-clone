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
    //var userBoards = $firebaseArray(boardsRef).child("uid").equalTo();

    // var boardsCtrl =

    // return {
    //   forBoard: function (boardId) {
    //     return $firebaseArray(boardsRef).child(boardId);
    //   },
    //   forUser: function (userId) {
    //     return $firebaseArray(boardsRef).child(userId);
    //   },
    //   forTeam: function (teamId) {
    //     return $firebaseArray(boardsRef).child(teamId);
    //   },
    //   boards: function () {
    //     return $firebaseArray(boardsRef);
    //   }
    // };

    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    // var boards = $firebaseArray(boardsRef);
    // // create a query for the most recent 25 messages on the server
    // var query = boardsRef.orderByChild("uid").limitToLast(userId);
    // // the $firebaseArray service properly handles database queries as well
    // var filteredMessages = $firebaseArray(boardsRef.orderByChild("uid").limitToLast(userId));





    return {
      forUser: function(userId) {
        //console.log($firebaseArray(boardsRef).child("uid").equalTo(userId));
        // return $firebaseArray(boardsRef).orderBychild("uid").equalTo(userId);

        return $firebaseArray(boardsRef.orderByChild("uid").equalTo(userId));
        //return boardsRef.child(userId);
        //return $firebaseArray(boardsRef).orderBychild("uid");
      },

      all: boards
    };

    // return boards;

    // var Boards = {
    //
    //   createTeamBoard: function (uid, board) {
    //     return boardsRef.child(uid).set(user);
    //   }
    //
    //   createPrivateBoard: function (uid, board) {
    //     return boardsRef.child(uid).set(user);
    //   }
    //
    //   projectsCtrl.createProject = function () {
    //     projectsCtrl.projects.$add(projectsCtrl.newProject).then(function() {
    //       projectsCtrl.newProject = {
    //         name: ''
    //       };
    //       console.log('success');
    //       $state.go('projects');
    //     }, function (error) {
    //       console.log('error', error);
    //     });
    //   };
    //
    //   createProfile: function (uid, user){
    //     return boardsRef.child(uid).set(user);
    //   },
    //
    //   getProfile: function (uid) {
    //     return $firebaseObject(boardsRef.child(uid));
    //   },
    //
    //
    //   // TODO: remove this method
    //   getFirstName: function (uid) {
    //     return Boards.getProfile(uid).$loaded().then(function (profile) {
    //       return profile.firstName;
    //     });
    //   },
    //
    //   getName: function (uid) {
    //     return Boards.getProfile(uid).$loaded().then(function (profile) {
    //       return profile.name;
    //     });
    //   },
    //
    //   all: boards
    // };

  });
