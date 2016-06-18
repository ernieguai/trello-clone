'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('LoginCtrl', function (alert, Auth, Users, $state) {

    var loginCtrl = this;

    loginCtrl.userAuth = {
      email: '',
      password: ''
    };

    loginCtrl.login = function() {
      Auth.$authWithPassword(loginCtrl.userAuth).then(function (auth) {
        $state.go('main');
        Users.getName(auth.uid).then(function (name) {
          alert('success', "Welcome back " + name + "!");
        });
      }, function (error) {
        alert('danger', error.message);
      });
    };

  });
