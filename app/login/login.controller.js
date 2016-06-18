'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('AuthCtrl', function (alert, Auth, Users, Accounts, $state, $http, PAYMENT_URL) {

    var authCtrl = this;

    authCtrl.userAuth = {
      email: '',
      password: ''
    };

    authCtrl.userProfile = {
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      teamSize: ''
    };

    // authCtrl.createStripeCustomer = function () {
    //   $http.post(PAYMENT_URL + 'api/create', {
    //     'email': authCtrl.userAuth.email,
    //     'plan': authCtrl.userProfile.teamSize === 1 ? 'freelancer' : 'basic',
    //   }).then(function(success) {
    //     console.log('Stripe success: ' + success);
    //   }, function (error) {
    //     console.log('Stripe error: ' + error);
    //   });
    // };

    authCtrl.createStripeCustomer = function () {
      return $http.post(PAYMENT_URL + 'api/createCustomer', {
        'email': authCtrl.userAuth.email,
        'plan': authCtrl.userProfile.teamSize === 1 ? 'freelancer' : 'basic',
      });
    };

    authCtrl.register = function () {
      Auth.$createUser(authCtrl.userAuth).then(function (userData) {
        console.log("User " + userData.uid + " created successfully!");

        // Create a Stripe account for the newly created user including the "uid" as the customer number

      });
    };

    authCtrl.register = function() {
      authCtrl.createStripeCustomer().then(function (success) {
      Auth.$createUser(authCtrl.userAuth).then(function (user) {
        return Auth.$authWithPassword(authCtrl.userAuth);
      }).then(function (authData) {

        // Create account subscription info
        // Accounts.createAccount(authData.uid).then(function() {

          // create Profile after account is created...
          Users.createProfile(authData.uid, authCtrl.userProfile).then(function() {
            $state.go('main');
            Users.getFirstName(authData.uid).then(function (firstName) {
              alert('success', "Welcome " + firstName + "!");
            });
            // TODO: need to handle profile update error here.
          });

        // }, function (error) {
        //   alert('danger', error.message + ": Unable to create account");
        //   // TODO: need to fix this...still logs user in when there is an error
        // });

      }).catch(function (error) {
        alert('danger', error.message);
      });
      }, function (error) {
        console.log(error);
      });
    };

    // TODO: pull out method for handling errors and refactor

    authCtrl.login = function() {
      Auth.$authWithPassword(authCtrl.userAuth).then(function (auth) {
        $state.go('main');
        Users.getFirstName(auth.uid).then(function (firstName) {
          alert('success', "Welcome back " + firstName + "!");
        });
      }, function (error) {
        alert('danger', error.message);
      });
    };

  });
