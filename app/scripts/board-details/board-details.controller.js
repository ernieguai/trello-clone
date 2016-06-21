'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardDetailsCtrl
 * @description
 * # BoardDetailsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardDetailsCtrl', function (profile, boardTitle, boards, board, lists, cards) {
    var boardDetailsCtrl = this;

    boardDetailsCtrl.boards = boards;
    boardDetailsCtrl.board = board;
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

    boardDetailsCtrl.starBoard = function(board) {
      var boardIndex = boardDetailsCtrl.boards.$indexFor(board.$id);
      if (boardDetailsCtrl.boards[boardIndex].starred === true) {
        boardDetailsCtrl.boards[boardIndex].starred = false;
      } else {
        boardDetailsCtrl.boards[boardIndex].starred = true;
      }
      boardDetailsCtrl.boards.$save(boardIndex);
    };

    boardDetailsCtrl.dropCallback = function(event, index, item, external, type, allowedType) {

      // TODO: refactor  -- use callbacks from the saves before updating all numbers. Moving too fast is screwing up the numbering

      var originCardIndex = boardDetailsCtrl.cards.$indexFor(item.$id);
      var originListIndex = item.list;

      var targetCardIndex = index;
      var targetListIndex = event.path[3].id;

      var originlistId = boardDetailsCtrl.lists.$indexFor(targetListIndex);
      var listIndex = boardDetailsCtrl.lists.$indexFor(originListIndex);

      // TODO: need an if statement if it's own list...
      console.log("origin", originCardIndex);
      console.log("target", targetCardIndex);
      // if ((originListIndex === targetListIndex) && (originCardIndex + 1 === targetCardIndex)) {
      //if ((originListIndex === targetListIndex) && (targetCardIndex > boardDetailsCtrl.lists[originlistId].cardsInList)) {
      if ((targetCardIndex > boardDetailsCtrl.lists[originlistId].cardsInList)) {
        //console.log('dropping in the same list and the same spot');
        console.log('dropping at the end of the list');
        return false;
      }
      //} else if ((originListIndex !== targetListIndex) && (targetCardIndex > boardDetailsCtrl.lists[originlistId].cardsInList))

      if ((originListIndex === targetListIndex) && (originCardIndex + 1 === targetCardIndex)) {
        console.log('dropping in the same list and the same spot');
        return false;
      }


      // Move the card into new list
      boardDetailsCtrl.cards[originCardIndex].list = targetListIndex;

      // TODO: check this function for errors
      function logArrayElements(element, index, array) {
        if (element.list === targetListIndex) {
          // update list number for the rest of the target list if the list number is >= target number
          // problem is this iterates through all cards, including the card moved with the new index. move this to before the card index is changed
          if (element.listNumber > targetCardIndex) {
            element.listNumber = element.listNumber + 1;
          }
        }
      }

      // TODO: iterate through the list that the card left and decrease the numbers after the card taken by 1

      boardDetailsCtrl.cards.forEach(logArrayElements);

      // update the listNumber (position) for the new card -- need to add one here to make index match our number system
      // boardDetailsCtrl.cards[originCardIndex].listNumber = targetCardIndex;
      boardDetailsCtrl.cards[originCardIndex].listNumber = targetCardIndex + 1;

      // increment the list number total for the target list (+1) TODO: is this still good or should we add 2? don't add anything
      boardDetailsCtrl.lists[originlistId].cardsInList = boardDetailsCtrl.lists[originlistId].cardsInList + 1;
      boardDetailsCtrl.lists.$save(originlistId);

      // increment the list number total for the origin list (-1)
      boardDetailsCtrl.lists[listIndex].cardsInList = boardDetailsCtrl.lists[listIndex].cardsInList - 1;
      boardDetailsCtrl.lists.$save(listIndex);


      boardDetailsCtrl.cards.$save(originCardIndex);
      return true;
   };

    boardDetailsCtrl.addNewList = function () {
      boardDetailsCtrl.lists.$add({
        uid: profile.$id,
        title: boardDetailsCtrl.newList.title,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        cardsInList: 0
      }).then(function () {
        boardDetailsCtrl.newList = { title: '' };
      });
    };

    boardDetailsCtrl.addNewCard = function (list) {

      var cardsInList;

      if (!list.cardsInList) {
        cardsInList = 1;
      } else {
        cardsInList = list.cardsInList + 1;
      }

      var listNumber = cardsInList;
      var listIndex = boardDetailsCtrl.lists.$indexFor(list.$id);

      boardDetailsCtrl.cards.$add({
        uid: profile.$id,
        list: list.$id,
        title: list.newCard.title,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        listNumber: listNumber
      }).then(function () {
        list.newCard = { title: '' };
        list.cardsInList = listNumber;
        list.$save(listIndex);
      });

    };

  });
