'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Alert
 * @description
 * # Alert
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('alert', function ($rootScope, $window) {

    $rootScope.alerts = [];

    return function(type, msg, timeout) {

      $rootScope.alerts.push({
        type: type,
        msg: msg,
        timeout: timeout || 2000
      });

      $window.scrollTo(0, 0);

      $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
      };

    };

  });
