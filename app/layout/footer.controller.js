'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('FooterCtrl', function () {
    var footerCtrl = this;

    footerCtrl.year = new Date().getFullYear();
  });
