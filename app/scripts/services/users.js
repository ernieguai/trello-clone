'use strict';

/**
 * @ngdoc service
 * @name frinvoiceApp.users
 * @description
 * # users
 * Factory in the frinvoiceApp.
 */
angular.module('frinvoiceApp')
  .factory('Users', function ($firebaseArray, $firebaseObject, FirebaseUrl) {
    var usersRef = new Firebase(FirebaseUrl + 'users');
    var users = $firebaseArray(usersRef);

    var Users = {

      createProfile: function (uid, user){
        return usersRef.child(uid).set(user);
      },

      getProfile: function (uid) {
        return $firebaseObject(usersRef.child(uid));
      },

      getFirstName: function (uid) {
        return Users.getProfile(uid).$loaded().then(function (profile) {
          return profile.firstName;
        });
      },

      all: users
    };

    return Users;

  });


// Need to refactor this? Should it only be a user facorty with access to the current user information
// Then an employees or team factory that will list all the user info necessary for a team admin?
