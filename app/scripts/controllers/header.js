'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
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
