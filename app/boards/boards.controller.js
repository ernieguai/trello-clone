'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardsCtrl', function (boards, teams, $uibModal, $log) {
    var boardsCtrl = this;

    boardsCtrl.teams = teams;
    boardsCtrl.boards = boards;

    function teamsResolve() {
      return boardsCtrl.teams;
    }

    function boardsResolve() {
      return boardsCtrl.boards;
    }

    boardsCtrl.starBoard = function(board) {
      console.log("boards", boards);
      console.log("board id", board.$id);
      console.log("index of board: ", boards.$indexFor(board.$id));
      var boardIndex = boards.$indexFor(board.$id);
      console.log("board info", boardsCtrl.boards[boardIndex]);
      boardsCtrl.boards[boardIndex].foo = "bar";
      if (boardsCtrl.boards[boardIndex].starred === true) {
        boardsCtrl.boards[boardIndex].starred = false;
      } else {
        boardsCtrl.boards[boardIndex].starred = true;
      }
      boardsCtrl.boards.$save(boardIndex);
    };

    boardsCtrl.modals = {
      newTeam: {
        templateUrl: 'boards/boards.new-team.html',
        controller: 'NewTeamCtrl as newTeamCtrl',
        resolve: { teams: teamsResolve }
      },
      newBoard: {
        templateUrl: 'boards/boards.new-board.html',
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
     }, function () {
       $log.info('Modal dismissed at: ' + new Date());
     });
   };

  });
