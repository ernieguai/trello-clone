'use strict';

/**
 * @ngdoc overview
 * @name frinvoiceApp
 * @description
 * # frinvoiceApp
 *
 * Main module of the application.
 */
angular
  .module('frinvoiceApp', ['firebase', 'ui.router', 'angular-md5', 'ui.bootstrap', 'angular-stripe', 'credit-cards']);
