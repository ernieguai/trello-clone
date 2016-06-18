'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Accounts
 * @description
 * # Accounts
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Accounts', function ($firebaseArray, $firebaseObject, FirebaseUrl, $http, PAYMENT_URL) {
    var accountsRef = new Firebase(FirebaseUrl + 'accounts');
    var accounts = $firebaseArray(accountsRef);

    // instead of calling Firebase, we want to call the payment server to create
    // an account with a subscription and a 30 day free trial
    // or do we create a 30 day free trial -- notify the user of how many days left
    // and when it's complete, lock them out of the system until they sign up for
    // a sub?

    var Accounts = {

      createAccount: function (uid){

        // pass the uid to the serivce
        return $http.post(PAYMENT_URL + 'accounts', {
          uid: uid,
          freeTrial: true
        });

        // return accountsRef.child(uid).set({
        //   freeTrial: true
        // });
      },

      // TODO: need an update user PUT method


      // TODO: change this method
      getProfile: function (uid) {
        return $firebaseObject(accountsRef.child(uid));
      },


      // TODO: change this method
      getFirstName: function (uid) {
        return Accounts.getProfile(uid).$loaded().then(function (profile) {
          return profile.firstName;
        });
      },

      all: accounts
    };

    return Accounts;


    // Service logic
    // ...

    // var meaningOfLife = 42;
    //
    // // Public API here
    // return {
    //   someMethod: function () {
    //     return meaningOfLife;
    //   }
    // };
  });
