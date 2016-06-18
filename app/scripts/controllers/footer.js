'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
  .controller('FooterCtrl', function () {
    var footerCtrl = this;

    footerCtrl.year = new Date().getFullYear();
  });
