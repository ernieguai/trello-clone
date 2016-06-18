'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
  .controller('SettingsCtrl', function ($scope, stripe, $http, $state, alert, PAYMENT_URL) {

    // var settingsCtrl = this;

    // move this key to a more appropriate place
    stripe.setPublishableKey('pk_test_XCIuXiDVUHUgb66aBFAvKWKh');

    // set the amount to be charged
    // TODO: figure out where to set this!! Price should be set on the Server side. NOT on the Front as this could be hacked.
    // TODO: need to enter details here about the user...i.e. email, name, etc for creating a customer
    //$scope.payment = {};

    // one time card card
    $scope.charge = function () {
      $scope.isSubmitting = true;

      return stripe.card.createToken($scope.payment.card)
        .then(function (response) {
          console.log('token created for card ending in ', response.card.last4);
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.token = response.id;
          // TODO: build out the server route
          return $http.post(PAYMENT_URL + 'api/charge', payment);
        })
        .then(function (payment) {
          console.log('successfully submitted payment for $', payment.data.amount / 100);
          // add maNotifier here
          console.log('I am payment', payment);
          // redirect back to profile page here -- TODO: add a success page here!!!!
          $state.go('profile');
          //$location.path('/profile');
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
          else {
            console.log('Other error occurred, possibly with your API', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
        });
    };

    $scope.createCustomer = function (payment) {
      return $http.post(PAYMENT_URL + 'api/create', payment);
    };

    // create a new customer
    $scope.createCustomer = function () {
      $scope.isSubmitting = true;

      return stripe.card.createToken($scope.payment.card)
        .then(function (response) {
          console.log('token created for card ending in ', response.card.last4);
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.token = response.id;
          // TODO: build out the server route
          console.log(payment);
          return $http.post(PAYMENT_URL + 'api/create', payment);
        })
        .then(function (payment) {
          console.log('payment: ', payment.data);
          console.log('successfully submitted payment for $', payment.data.amount / 100);
          // add maNotifier here
          console.log('I am payment', payment);
          // redirect back to profile page here -- TODO: add a success page here!!!!
          $state.go('profile');
          //$location.path('/profile');
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
          else {
            console.log('Other error occurred, possibly with your API', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
        });
    };


    // TODO: create a customer with a free trial WITHOUT collecting a credit card number
    // create a new customer WITHOUT card
    $scope.createCustomerWithoutCard = function () {
      $scope.isSubmitting = true;

      // $scope.payment.card = null;

      // stripe.tokens.create({
      //   pii: {
      //     personal_id_number: '000000000'
      //   }
      // }, function(err, token) {
      //   // asynchronously called
      // });

      return stripe.card.createToken({
        pii: {
          personal_id_number: '000000000'
        }
      })
        .then(function (response) {
          console.log('token created for card ending in ', response.card.last4);
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.token = response.id;
          // TODO: build out the server route
          console.log(payment);
          return $http.post(PAYMENT_URL + 'api/create', payment);
        })
        .then(function (payment) {
          console.log('payment: ', payment.data);
          console.log('successfully submitted payment for $', payment.data.amount / 100);
          // add maNotifier here
          console.log('I am payment', payment);
          // redirect back to profile page here -- TODO: add a success page here!!!!
          $state.go('profile');
          //$location.path('/profile');
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
          else {
            console.log('Other error occurred, possibly with your API', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
        });
    };


    // Edit customer data
    $scope.editCustomer = function () {
      $scope.isSubmitting = true;

      return stripe.card.createToken($scope.payment.card)
        .then(function (response) {
          console.log('token created for card ending in ', response.card.last4);
          var payment = angular.copy($scope.payment);
          payment.card = void 0;
          payment.token = response.id;
          // TODO: build out the server route
          return $http.post(PAYMENT_URL + 'api/charge', payment);
        })
        .then(function (payment) {
          console.log('successfully submitted payment for $', payment.data.amount / 100);
          // add maNotifier here
          console.log('I am payment', payment);
          // redirect back to profile page here -- TODO: add a success page here!!!!
          $state.go('profile');
          //$location.path('/profile');
        })
        .catch(function (err) {
          if (err.type && /^Stripe/.test(err.type)) {
            console.log('Stripe error: ', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
          else {
            console.log('Other error occurred, possibly with your API', err.message);
            alert('danger', 'We are having trouble reaching our server. Please try again');
          }
        });
    };

  });
