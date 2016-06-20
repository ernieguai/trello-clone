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
      cards: boardDetailsCtrl.cards
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
      console.log("ALL CARDS: ", boardDetailsCtrl.cards);

      // console.log("allowedType: ", allowedType);
      var originCardIndex = boardDetailsCtrl.cards.$indexFor(item.$id);
      console.log("Origin Card Index", originCardIndex);
      var originListIndex = item.list;
      console.log("Origin List Index", originListIndex);

      var targetCardIndex = index;
      console.log("Target Card Index", targetCardIndex);

      var targetListIndex = event.path[3].id;
      console.log("Target List Index", targetListIndex);


      // Move the card into new list
      boardDetailsCtrl.cards[originCardIndex].list = targetListIndex;

      // update the listNumber (position) for the new card
      boardDetailsCtrl.cards[originCardIndex].listNumber = targetCardIndex;

      // increment the list number total for the target list (+1)
      var originlistId = boardDetailsCtrl.lists.$indexFor(targetListIndex);
      boardDetailsCtrl.lists[originlistId].cardsInList = boardDetailsCtrl.lists[originlistId].cardsInList + 1;
      boardDetailsCtrl.lists.$save(originlistId);

      // increment the list number total for the origin list (-1)
      var listIndex = boardDetailsCtrl.lists.$indexFor(originListIndex);
      boardDetailsCtrl.lists[listIndex].cardsInList = boardDetailsCtrl.lists[listIndex].cardsInList - 1;
      boardDetailsCtrl.lists.$save(listIndex);

      function logArrayElements(element, index, array) {
        if (element.list === targetListIndex) {
          console.log('a[' + index + '] = ' + element.listNumber);
          console.log(element.list);


          // update list number for the rest of the target list if the list number is >= target number
          if (element.listNumber >= targetCardIndex) {
            console.log("updating list number");
            element.listNumber = element.listNumber + 1;
          }

        }
      }

      boardDetailsCtrl.cards.forEach(logArrayElements);
      boardDetailsCtrl.cards.$save(originCardIndex);
      return true;
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

      var cardsInList = list.cardsInList ? list.cardsInList : 0;
      console.log("cardsInList: ", cardsInList);

      var listNumber = cardsInList + 1;
      // upsate list here with $add and new listNumber

      console.log('listNumber', listNumber);
      console.log('list', list);
      console.log('list id', list.$id);
      console.log('index of list: ', boardDetailsCtrl.lists.$indexFor(list.$id));

      var listIndex = boardDetailsCtrl.lists.$indexFor(list.$id);
      boardDetailsCtrl.lists[listIndex].cardsInList = listNumber;
      boardDetailsCtrl.lists.$save(listIndex).then(function (success) {
        console.log("list updated", success);
      }, function (error) {
        console.log("list update failed", error);
      });

      boardDetailsCtrl.cards.$add({
        uid: profile.$id,
        list: list.$id,
        title: list.newCard.title,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        listNumber: listNumber
      }).then(function () {
        list.newCard = { title: '' };
      });
    };

    // boardsCtrl.starBoard = function(board) {
    //   console.log("boards", boards);
    //   console.log("board id", board.$id);
    //   console.log("index of board: ", boards.$indexFor(board.$id));
    //   var boardIndex = boards.$indexFor(board.$id);
    //   if (boardsCtrl.boards[boardIndex].starred === true) {
    //     boardsCtrl.boards[boardIndex].starred = false;
    //   } else {
    //     boardsCtrl.boards[boardIndex].starred = true;
    //   }
    //   boardsCtrl.boards.$save(boardIndex);
    // };

    // upvotesRef.transaction(function (current_value) {
    //   return (current_value || 0) + 1;
    // });


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
