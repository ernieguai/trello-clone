'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardDetailsCtrl
 * @description
 * # BoardDetailsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  // .controller('BoardDetailsCtrl', function ($scope, profile, teams, boards, lists, cards, boardTitle, $uibModal, $log) {
  .controller('BoardDetailsCtrl', function (profile, boardTitle, boards, lists, cards, $scope) {
  // .controller('BoardDetailsCtrl', function (lists, boardTitle, $uibModal, $log) {

    var boardDetailsCtrl = this;

    boardDetailsCtrl.lists = lists;
    boardDetailsCtrl.cards = cards;
    boardDetailsCtrl.boardTitle = boardTitle;

    boardDetailsCtrl.newList = {
      title: ''
    };


    // stage data here to be moved...
    boardDetailsCtrl.models = {
      selected: null,
      // lists: {"A": [], "B": []}
      cards: boardDetailsCtrl.cards
    };

    $scope.moveCallback = function($index) {
      console.log("move $index: ", $index);
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
      console.log("ALL CARDS: ", boardDetailsCtrl.cards);

      // console.log("event: ", event);
      // console.log("index: ", index);
      // console.log("item: ", item);
      // console.log("external: ", external);
      // console.log("type: ", type);
      // console.log("allowedType: ", allowedType);
      var originCardIndex = boardDetailsCtrl.cards.$indexFor(item.$id);
      console.log("Origin Card Index", originCardIndex);
      var targetListIndex = event.path[3].id;
      console.log("Target List Index", targetListIndex);

      // if (external) {
      //     if (allowedType === 'itemType' && !item.label) return false;
      //     if (allowedType === 'containerType' && !angular.isArray(item)) return false;
      // }


      var originListIndex = item.list;
      console.log("Origin List Index", originListIndex);

      //var droppedList = "";
      // console.log("droppedList", droppedList);

      boardDetailsCtrl.cards[originCardIndex].list = targetListIndex;

      boardDetailsCtrl.cards.$save(originCardIndex);
      // need to reload the page after this?

      // return item;
      return true;
   };

   $scope.insertedCallback = function(index, event) {
     console.log("Inserted callback index: ", index);
     console.log("Inserted callback event: ", event);
     console.log("Inserted callback event Path: ", event.path[3].id);
   };



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
      boardDetailsCtrl.cards.$add({
        uid: profile.$id,
        list: list.$id,
        title: list.newCard.title,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }).then(function () {
        list.newCard = { title: '' };
      });
    };

    // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //   boardDetailsCtrl.models.cards.A.push({label: "Item A" + i});
    //   boardDetailsCtrl.models.cards.B.push({label: "Item B" + i});
    // }

    // Model to JSON for demo purpose
    // $scope.$watch('boardDetailsCtrl.models', function(model) {
    //   $scope.modelAsJson = angular.toJson(model, true);
    // }, true);

    // boardDetailsCtrl.$watch







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
