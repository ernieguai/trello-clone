'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.users
 * @description
 * # users
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
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

      getName: function (uid) {
        return Users.getProfile(uid).$loaded().then(function (profile) {
          return profile.name;
        });
      },

      all: users
    };

    return Users;

  });
