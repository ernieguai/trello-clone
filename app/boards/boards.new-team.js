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

    newTeamCtrl.newTeam = {
      name: '',
      description: ''
    };

    newTeamCtrl.create = function () {
      newTeamCtrl.teams.$add(newTeamCtrl.newTeam).then(function () {
        $uibModalInstance.close();
      });
    };

    newTeamCtrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
