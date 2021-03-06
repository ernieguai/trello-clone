'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('ProfileCtrl', function ($state, auth, profile, Auth, Users) {
    var profileCtrl = this;

    profileCtrl.profile = profile;
    profileCtrl.email = auth.password.email;

    profileCtrl.updateProfile = function() {
      profileCtrl.profile.$save().then(function() {
        $state.go('boards');
      });
    };

    profileCtrl.gravatarURL = auth.password.profileImageURL;

  });
