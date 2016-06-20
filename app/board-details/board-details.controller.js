'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardDetailsCtrl
 * @description
 * # BoardDetailsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardDetailsCtrl', function (profile, boardTitle, boards, lists, cards, $scope) {

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

      var originCardIndex = boardDetailsCtrl.cards.$indexFor(item.$id);
      var originListIndex = item.list;

      var targetCardIndex = index;
      var targetListIndex = event.path[3].id;

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

      // TODO: check this function for errors
      function logArrayElements(element, index, array) {
        if (element.list === targetListIndex) {
          // update list number for the rest of the target list if the list number is >= target number
          if (element.listNumber >= targetCardIndex) {
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
      var listNumber = cardsInList + 1;
      var listIndex = boardDetailsCtrl.lists.$indexFor(list.$id);

      boardDetailsCtrl.lists[listIndex].cardsInList = listNumber;
      boardDetailsCtrl.lists.$save(listIndex)

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

  });
