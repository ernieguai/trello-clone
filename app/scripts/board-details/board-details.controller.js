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

    boardDetailsCtrl.dropCallback = function(event, index, item, external, type, allowedType) {

      // card being dragged
      var originCardList = item.list;
      var originCardListNumber = item.listNumber;
      // position it's dragged to
      var targetCardList = event.path[3].id;
      var targetCardListNumber = index + 1;

      // exit if dropping at the end of a list
      if (targetCardListNumber - 1 > boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList) {
        return false;
      }

      // if dropped in the same list
      if (originCardList === targetCardList) {
        if (originCardListNumber === targetCardListNumber - 1) {
          return false;
        }

        boardDetailsCtrl.cards.forEach(function(card) {
          if (card.list === targetCardList) {

            if (card.listNumber >= targetCardListNumber && card.listNumber <= originCardListNumber-1) {
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber + 1;
              // save the card and set listNumber for new card
              boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber;
            }

            if (card.listNumber <= targetCardListNumber-1 && card.listNumber >= originCardListNumber) {
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber - 1;
              boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
              // save the card and set listNumber for new card
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber-1;
            }

          }
        });

        // Save the card and list to database
        boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(item.$id));
        boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(originCardList));
        return true;
      }

      // iterate through cards and adjust number in target list
      boardDetailsCtrl.cards.forEach(function(card) {
        if ((card.list === targetCardList) && (card.listNumber >= targetCardListNumber)) {
          boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber + 1;
          boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
        }
      });

      // move origin card to target list
      boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].list = targetCardList;
      boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber;
      // add 1 card to the target list
      boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList = boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList + 1;

      // iterate through cards and adjust numbers in origin list
      boardDetailsCtrl.cards.forEach(function(card) {
        if ((card.list === originCardList) && (card.listNumber >= originCardListNumber)) {
          // add one to listNumber and save to DB
          boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber - 1;
          boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
        }
      });
      // remove 1 card from the origin list
      boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(originCardList)].cardsInList = boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(originCardList)].cardsInList - 1;

      // Save the origin card, target list, and origin list
      boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(item.$id));
      boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(targetCardList));
      boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(originCardList));
      return true;

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

    boardDetailsCtrl.addNewCard = function (passedlist) {

      var cardsInList;

      if (!passedlist.cardsInList) {
        cardsInList = 1;
      } else {
        cardsInList = passedlist.cardsInList + 1;
      }

      var listNumber = cardsInList;
      var listIndex = boardDetailsCtrl.lists.$indexFor(passedlist.$id);

      boardDetailsCtrl.cards.$add({
        uid: profile.$id,
        list: passedlist.$id,
        title: passedlist.newCard.title,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        listNumber: listNumber
      }).then(function () {
        passedlist.newCard = { title: '' };
        passedlist.cardsInList = listNumber;
        boardDetailsCtrl.lists.$save(listIndex);
      });

    };

  });
