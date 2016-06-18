'use strict';

/**
 * @ngdoc service
 * @name trellocloneApp.Teams
 * @description
 * # Teams
 * Factory in the trellocloneApp.
 */
angular.module('trellocloneApp')
  .factory('Teams', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
