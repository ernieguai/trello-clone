'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.stripe
 * @description
 * # stripe
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Stripe', function ($http, stripe) {
    // Service logic
    // ...
    // TODO: move this publishable key to a config file
    stripe.setPublishableKey('pk_test_XCIuXiDVUHUgb66aBFAvKWKh');

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
