'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('AuthCtrl', function (alert, Auth, Users, $state, $http) {

    var authCtrl = this;

    authCtrl.userAuth = {
      email: '',
      password: ''
    };

    authCtrl.userProfile = {
      name: ''
    };

    authCtrl.register = function() {
      Auth.$createUser(authCtrl.userAuth).then(function (user) {
        return Auth.$authWithPassword(authCtrl.userAuth);
      }).then(function (authData) {

          // create Profile after account is created...
          Users.createProfile(authData.uid, authCtrl.userProfile).then(function() {
            $state.go('main');
            Users.getName(authData.uid).then(function (name) {
              alert('success', "Welcome " + name + "!");
            });
            // TODO: need to handle profile update error here.
          });


      }).catch(function (error) {
        alert('danger', error.message);
      });

    };

    // TODO: pull out method for handling errors and refactor

    authCtrl.login = function() {
      Auth.$authWithPassword(authCtrl.userAuth).then(function (auth) {
        $state.go('main');
        Users.getName(auth.uid).then(function (name) {
          alert('success', "Welcome back " + name + "!");
        });
      }, function (error) {
        alert('danger', error.message);
      });
    };

  });
