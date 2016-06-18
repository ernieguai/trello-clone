'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller: NewTeamCtrl
 * @description
 * # NewTeamCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('NewTeamCtrl', function (teams, $uibModalInstance) {
    var newTeamCtrl = this;

    newTeamCtrl.teams = teams;

    // newTeamCtrl.items = items;
    // newTeamCtrl.selected = {
    //   item: newTeamCtrl.items[0]
    // };

    newTeamCtrl.newTeam = {
      name: '',
      description: ''
    };

    newTeamCtrl.create = function () {
      newTeamCtrl.teams.$add(newTeamCtrl.newTeam).then(function () {
        // newTeamCtrl.newTeam = {
        //   name: '',
        //   description: ''
        // };
        $uibModalInstance.close();
      });
    };

    // newTeamCtrl.ok = function () {
    //   $uibModalInstance.close(newTeamCtrl.selected.item);
    // };

    newTeamCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
