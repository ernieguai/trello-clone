'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardsCtrl', function (boards, teams, $uibModal) {
    var boardsCtrl = this;

    boardsCtrl.teams = teams;
    boardsCtrl.boards = boards;

    function teamsResolve() { return boardsCtrl.teams; }
    function boardsResolve() { return boardsCtrl.boards; }

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
        resolve: { teams: teamsResolve }
      },
      newBoard: {
        templateUrl: 'scripts/boards/boards.new-board.html',
        controller: 'NewBoardCtrl as newBoardCtrl',
        resolve: { teams: teamsResolve, boards: boardsResolve }
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
