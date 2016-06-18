'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardsCtrl', function () {
    var boardsCtrl = this;
    
    boardsCtrl.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
