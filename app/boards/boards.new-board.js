'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: NewBoardCtrl
 * @description
 * # NewBoardCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('NewBoardCtrl', function (boards, teams, $uibModalInstance) {
    var newBoardCtrl = this;

    newBoardCtrl.boards = boards;
    newBoardCtrl.teams = teams;
    newBoardCtrl.newBoard = {
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
