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
    var ref = new Firebase(FirebaseUrl + 'boards');
    var boards = $firebaseArray(ref);

    return boards;

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

    // return Boards;

  });
