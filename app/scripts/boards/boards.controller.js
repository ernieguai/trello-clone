'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardsCtrl', function (boards, teams, $uibModal, profile) {
    var boardsCtrl = this;

    boardsCtrl.teams = teams;
    boardsCtrl.boards = boards;
    boardsCtrl.profile = profile;
    console.log(boardsCtrl.profile);

    function teamsResolve() { return boardsCtrl.teams; }
    function boardsResolve() { return boardsCtrl.boards; }
    function profileResolve() { return boardsCtrl.profile; }

    boardsCtrl.starBoard = function(board) {
      var boardIndex = boards.$indexFor(board.$id);
      if (boardsCtrl.boards[boardIndex].starred === true) {
        boardsCtrl.boards[boardIndex].starred = false;
      } else {
        boardsCtrl.boards[boardIndex].starred = true;
      }
      boardsCtrl.boards.$save(boardIndex);
    };

    boardsCtrl.modals = {
      newTeam: {
        templateUrl: 'scripts/boards/boards.new-team.html',
        controller: 'NewTeamCtrl as newTeamCtrl',
        resolve: { teams: teamsResolve, profile: profileResolve  }
      },
      newBoard: {
        templateUrl: 'scripts/boards/boards.new-board.html',
        controller: 'NewBoardCtrl as newBoardCtrl',
        resolve: { teams: teamsResolve, boards: boardsResolve, profile: profileResolve }
      }
    };

    boardsCtrl.open = function (template) {
     var modalInstance = $uibModal.open({
       animation: boardsCtrl.animationsEnabled,
       templateUrl: boardsCtrl.modals[template].templateUrl,
       controller: boardsCtrl.modals[template].controller,
       size: 'sm',
      resolve: boardsCtrl.modals[template].resolve
     });

     modalInstance.result.then(function (selectedItem) {
       boardsCtrl.selected = selectedItem;
     });
   };

  });
