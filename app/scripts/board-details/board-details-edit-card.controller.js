'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: EditCardCtrl
 * @description
 * # EditCardCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('EditCardCtrl', function (cards, card, $uibModalInstance) {
    var editCardCtrl = this;

    editCardCtrl.cards = cards;
    editCardCtrl.card = card;

    editCardCtrl.editCard = {
      title: editCardCtrl.card.title,
      description: editCardCtrl.card.description || ''
    };

    editCardCtrl.save = function() {
      editCardCtrl.card.title = editCardCtrl.editCard.title;
      editCardCtrl.card.description = editCardCtrl.editCard.description;
      editCardCtrl.cards.$save(editCardCtrl.cards.$indexFor(editCardCtrl.card.$id));
      $uibModalInstance.close();
    };

    editCardCtrl.delete = function() {
      editCardCtrl.cards.$remove(editCardCtrl.cards.$indexFor(editCardCtrl.card.$id));
      $uibModalInstance.close();
    };

    editCardCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
