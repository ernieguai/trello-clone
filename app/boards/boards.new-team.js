'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: NewTeamCtrl
 * @description
 * # NewTeamCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('NewTeamCtrl', function ($uibModalInstance) {
    var newTeamCtrl = this;

    // newTeamCtrl.items = items;
    // newTeamCtrl.selected = {
    //   item: newTeamCtrl.items[0]
    // };

    newTeamCtrl.ok = function () {
      $uibModalInstance.close(newTeamCtrl.selected.item);
    };

    newTeamCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
