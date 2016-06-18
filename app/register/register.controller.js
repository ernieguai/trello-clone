'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('RegisterCtrl', function (alert, Auth, Users, $state) {

    var registerCtrl = this;

    registerCtrl.userAuth = {
      email: '',
      password: ''
    };

    registerCtrl.userProfile = {
      name: ''
    };

    registerCtrl.register = function() {
      Auth.$createUser(registerCtrl.userAuth).then(function(user) {
        return Auth.$authWithPassword(registerCtrl.userAuth);
      }).then(function(authData) {

          // create Profile after account is created and user logged in
          Users.createProfile(authData.uid, registerCtrl.userProfile).then(function() {
            $state.go('main');
            Users.getName(authData.uid).then(function(name) {
              alert('success', "Welcome " + name + "!");
            });
          });

      }).catch(function (error) {
        alert('danger', error.message);
      });

    };

  });
