'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: NewBoardCtrl
 * @description
 * # NewBoardCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('NewBoardCtrl', function ($uibModalInstance) {
    var newBoardCtrl = this;

    // newBoardCtrl.items = items;
    // newBoardCtrl.selected = {
    //   item: newBoardCtrl.items[0]
    // };

    newBoardCtrl.ok = function () {
      $uibModalInstance.close(newBoardCtrl.selected.item);
    };

    newBoardCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
