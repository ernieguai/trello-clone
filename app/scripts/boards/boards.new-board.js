'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: NewBoardCtrl
 * @description
 * # NewBoardCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('NewBoardCtrl', function (boards, teams, $uibModalInstance, profile) {
    var newBoardCtrl = this;

    newBoardCtrl.boards = boards;
    newBoardCtrl.teams = teams;
    newBoardCtrl.profile = profile;
    newBoardCtrl.newBoard = {
      uid: newBoardCtrl.profile.$id,
      timestamp: Firebase.ServerValue.TIMESTAMP,
      title: '',
      team: ''
    };

    newBoardCtrl.create = function () {
      newBoardCtrl.boards.$add(newBoardCtrl.newBoard).then(function () {
        $uibModalInstance.close();
      });
    };

    newBoardCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
