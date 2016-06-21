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

      // TODO: refactor  -- use callbacks from the saves before updating all numbers. Moving too fast is screwing up the numbering

      // card being dragged
      var originCardList = item.list;
      var originCardListNumber = item.listNumber;

      // position it's dragged to
      var targetCardList = event.path[3].id;
      var targetCardListNumber = index + 1;


      // need to exit if dropping at the end of a list
      if (targetCardListNumber - 1 > boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList) {
        console.log('dropping at the end of the list');
        return false;
      }

      // need a condition for own list -- different rules on iteration
      if (originCardList === targetCardList) {
        console.log("dropping in OWN list");
        console.log("originCardListNumber: ", originCardListNumber);
        console.log("targetCardListNumber: ", targetCardListNumber);
        // condition for own spot
        if (originCardListNumber === targetCardListNumber - 1) {
          console.log("dropping in OWN index");
          return false;
        }



        // iterate through all items with a high index and increment by 1
        boardDetailsCtrl.cards.forEach(function(card) {
          // if card.list = targetList AND listNumner >= targetListNumber
          if (card.list === targetCardList) {
            // if (card.listNumber <= targetCardListNumber-1 && card.listNumber >= originCardListNumber-1)) {
            if (card.listNumber >= targetCardListNumber && card.listNumber <= originCardListNumber-1) {
              console.log("we're doing math");
              // add one to listNumber - use card.$id to update
              //card.listNumber = card.listNumber + 1;
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber + 1;
              // save the card?
              boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));

              // set index for new card
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber;
            }

            if (card.listNumber <= targetCardListNumber-1 && card.listNumber >= originCardListNumber) {
              console.log("we're doing math backwards math");
              // add one to listNumber - use card.$id to update
              //card.listNumber = card.listNumber + 1;
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber - 1;
              // save the card?
              boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));

              // set index for new card
              boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber-1;
            }
          }
        });

        // set index for new card
        // boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber;




        // Save the origin card
        boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(item.$id));

        // Save the origin list
        boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(originCardList));

        return true;
      }


      // iterate through cards and adjust number in target list - add 1 to listNumber
      boardDetailsCtrl.cards.forEach(function(card) {
        // if card.list = targetList AND listNumner >= targetListNumber
        if ((card.list === targetCardList) && (card.listNumber >= targetCardListNumber)) {
          // add one to listNumber - use card.$id to update
          //card.listNumber = card.listNumber + 1;
          boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber + 1;
          // save the card?
          boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
        }
      });

      // move origin card to target list
      // Move the card into new list
      // update item.$id in full cards array to have company and listNumber of the target
      // console.log(boardDetailsCtrl.cards.indexFor(item.$id));
      boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].list = targetCardList;
      boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(item.$id)].listNumber = targetCardListNumber;

      // add 1 card to the target list
      boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList = boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(targetCardList)].cardsInList + 1;



      // iterate through cards and adjust numbers in origin list - subtract 1 from listNumber
      boardDetailsCtrl.cards.forEach(function(card) {
        // if card.list = originList AND listNumner >= targetListNumber
        if ((card.list === originCardList) && (card.listNumber >= originCardListNumber)) {
          // add one to listNumber - use card.$id to update
          //card.listNumber = card.listNumber + 1;
          boardDetailsCtrl.cards[boardDetailsCtrl.cards.$indexFor(card.$id)].listNumber = card.listNumber - 1;
          // save the card?
          boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(card.$id));
        }
      });

      // remove 1 card from the origin list
      boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(originCardList)].cardsInList = boardDetailsCtrl.lists[boardDetailsCtrl.lists.$indexFor(originCardList)].cardsInList - 1;


      // Save the origin card
      boardDetailsCtrl.cards.$save(boardDetailsCtrl.cards.$indexFor(item.$id));
      // Save the target list
      boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(targetCardList));
      // Save the origin list
      boardDetailsCtrl.lists.$save(boardDetailsCtrl.lists.$indexFor(originCardList));
      return true;




      var listIndex = boardDetailsCtrl.lists.$indexFor(targetListIndex);
      var targetListArrayPos = boardDetailsCtrl.lists.$indexFor(targetListIndex);
      console.log('listIndex: ', listIndex);
      var originlistId = boardDetailsCtrl.lists.$indexFor(originListIndex);
      var originListArrayPos = boardDetailsCtrl.lists.$indexFor(originListIndex);
      console.log('originlistId: ', originlistId);

      // TODO: need an if statement if it's own list...
      console.log("origin", originCardIndex);
      console.log("target", targetCardIndex);
      // if ((originListIndex === targetListIndex) && (originCardIndex + 1 === targetCardIndex)) {
      //if ((originListIndex === targetListIndex) && (targetCardIndex > boardDetailsCtrl.lists[originlistId].cardsInList)) {

      console.log("cards in target list: ", boardDetailsCtrl.lists[targetListArrayPos].cardsInList);

      if ((targetCardIndex - 1 > boardDetailsCtrl.lists[targetListArrayPos].cardsInList)) {
        console.log('dropping at the end of the list');
        return false;
      }
      //} else if ((originListIndex !== targetListIndex) && (targetCardIndex > boardDetailsCtrl.lists[originlistId].cardsInList))

      if ((originListIndex === targetListIndex) && (originCardIndex + 1 === targetCardIndex)) {
        console.log('dropping in the same list and the same spot');
        return false;
      }


      // // Move the card into new list
      // boardDetailsCtrl.cards[originCardIndex].list = targetListIndex;
      //
      // // TODO: check this function for errors
      // function logArrayElements(element, index, array) {
      //   if (element.list === targetListIndex) {
      //     // update list number for the rest of the target list if the list number is >= target number
      //     // problem is this iterates through all cards, including the card moved with the new index. move this to before the card index is changed
      //     if (element.listNumber > targetCardIndex) {
      //       element.listNumber = element.listNumber + 1;
      //     }
      //   }
      // }

      // TODO: iterate through the list that the card left and decrease the numbers after the card taken by 1

      // boardDetailsCtrl.cards.forEach(logArrayElements);

      // update the listNumber (position) for the new card -- need to add one here to make index match our number system
      // boardDetailsCtrl.cards[originCardIndex].listNumber = targetCardIndex;
      // boardDetailsCtrl.cards[originCardIndex].listNumber = targetCardIndex + 1;

      // increment the list number total for the target list (+1) TODO: is this still good or should we add 2? don't add anything
      // boardDetailsCtrl.lists[originlistId].cardsInList = boardDetailsCtrl.lists[originlistId].cardsInList + 1;
      // boardDetailsCtrl.lists.$save(originlistId);
      //
      // // increment the list number total for the origin list (-1)
      // boardDetailsCtrl.lists[listIndex].cardsInList = boardDetailsCtrl.lists[listIndex].cardsInList - 1;
      // boardDetailsCtrl.lists.$save(listIndex);
      //
      //
      // boardDetailsCtrl.cards.$save(originCardIndex);
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
