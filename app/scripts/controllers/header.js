'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('HeaderCtrl', function ($scope, Auth, Users, $state) {

    $scope.logout = function() {
      Auth.$unauth();
      $state.go('main');
    };

    $scope.auth = Auth;

    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if ($scope.authData) {
        $scope.gravatarURL = $scope.authData.password.profileImageURL;
      }
    });

  });
