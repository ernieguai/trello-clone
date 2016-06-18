(function () {
'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
  .controller('ProfileCtrl', function ($state, md5, auth, profile, Auth, Users) {
    var profileCtrl = this;

    profileCtrl.profile = profile;
    profileCtrl.email = auth.password.email;

    profileCtrl.updateProfile = function() {
      // todo : validate the profile properties before saving them
      profileCtrl.profile.$save().then(function() {
        $state.go('projects');
      });
    };

    profileCtrl.gravatarURL = auth.password.profileImageURL;

  });
})();
