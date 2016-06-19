'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardDetailsCtrl
 * @description
 * # BoardDetailsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardDetailsCtrl', function (profile, teams, boards, lists, cards, boardTitle, $uibModal, $log) {
  // .controller('BoardDetailsCtrl', function (lists, boardTitle, $uibModal, $log) {
    var boardDetailsCtrl = this;

    boardDetailsCtrl.lists = lists;
    boardDetailsCtrl.cards = cards;
    boardDetailsCtrl.boardTitle = boardTitle;

    boardDetailsCtrl.newList = {
      title: ''
    };

    // var list = [];
    // boardDetailsCtrl.newCard = {
    //   title: ''
    // };

    boardDetailsCtrl.addNewList = function () {
      boardDetailsCtrl.lists.$add({
        uid: profile.$id,
        title: boardDetailsCtrl.newList.title,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }).then(function () {
        boardDetailsCtrl.newList = { title: '' };
      });
    };

    boardDetailsCtrl.addNewCard = function (list) {
      console.log("new card title: " + list.newCard.title);
      boardDetailsCtrl.cards.$add({
        uid: profile.$id,
        list: list.$id,
        title: list.newCard.title,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }).then(function () {
        list.newCard = { title: '' };
      });
    };

    // boardDetailsCtrl.addNewCard = function (list) {
    //
    //   console.log("list key: " + list.$id);
    //   console.log("list title: " + list.title);
    //   console.log("list timestamp: " + list.timestamp);
    //   // console.log("list details: " + boardDetailsCtrl.lists.$getRecord(list.$id));
    //
    //   // add new card to a list (save the list)
    //   // need the list id
    //
    //   // boardDetailsCtrl.lists[id].
    //
    //   // boardDetailsCtrl.lists[list.$id].$save({
    //   //list.$id.$add({
    //   list.$save({
    //     //uid: profile.$id,
    //     //title: boardDetailsCtrl.newCard.title,
    //     card: {
    //       title: "This is a test card",
    //       timestamp: Firebase.ServerValue.TIMESTAMP
    //     },
    //     //title: list.newCard.title,
    //     //timestamp: Firebase.ServerValue.TIMESTAMP
    //   }).then(function () {
    //     boardDetailsCtrl.newCard = { title: '' };
    //   });
    // };

    // function teamsResolve() {
    //   return boardDetailsCtrl.teams;
    // }
    //
    // function boardsResolve() {
    //   return boardDetailsCtrl.boards;
    // }
    //
    // boardDetailsCtrl.modals = {
    //   newTeam: {
    //     templateUrl: 'boards/boards.new-team.html',
    //     controller: 'NewTeamCtrl as newTeamCtrl',
    //     resolve: { teams: teamsResolve }
    //   },
    //   newBoard: {
    //     templateUrl: 'boards/boards.new-board.html',
    //     controller: 'NewBoardCtrl as newBoardCtrl',
    //     resolve: { teams: teamsResolve, boards: boardsResolve }
    //   }
    // };
    //
    // boardDetailsCtrl.open = function (template) {
    //   var modalInstance = $uibModal.open({
    //     animation: boardDetailsCtrl.animationsEnabled,
    //     templateUrl: boardDetailsCtrl.modals[template].templateUrl,
    //     controller: boardDetailsCtrl.modals[template].controller,
    //     size: 'sm',
    //     resolve: boardDetailsCtrl.modals[template].resolve
    //   });
    //
    //   modalInstance.result.then(function (selectedItem) {
    //     boardDetailsCtrl.selected = selectedItem;
    //   }, function () {
    //     $log.info('Modal dismissed at: ' + new Date());
    //   });
    // };

  });
