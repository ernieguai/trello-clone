'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Cards
 * @description
 * # Cards
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Cards', function ($firebaseArray, FirebaseUrl) {
    var cardsRef = new Firebase(FirebaseUrl + 'cards');
    var cards = $firebaseArray(cardsRef);

    return {
      forLists: function (listId) {
        return $firebaseArray(cardsRef.child(listId));
      },
      forUser: function (userId) {
        return $firebaseArray(cardsRef.child(userId));
      },
      all: cards
    };
  });
