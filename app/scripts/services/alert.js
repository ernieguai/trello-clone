'use strict';

/**
 * @ngdoc service
 * @name frinvoiceApp.Alert
 * @description
 * # Alert
 * Factory in the frinvoiceApp.
 */
angular.module('frinvoiceApp')
  .factory('alert', function ($rootScope, $window) {

    $rootScope.alerts = [];

    return function(type, msg, timeout) {

      $rootScope.alerts.push({
        type: type,
        msg: msg,
        timeout: timeout || 2000
      });

      // TODO: scroll to the top of the page when an alert happens. Replace with angular animations.
      $window.scrollTo(0, 0);

      $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
      };

    };

  });
