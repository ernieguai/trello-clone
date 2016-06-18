'use strict';

/**
 * @ngdoc function
 * @name trellocloneApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the trellocloneApp
 */
angular.module('trellocloneApp')
  .controller('BoardsCtrl', function (teams, $uibModal, $log) {
    var boardsCtrl = this;

    boardsCtrl.teams = teams;
    boardsCtrl.modals = {
      newTeam: {templateUrl: 'boards/boards.new-team.html', controller: 'NewTeamCtrl as newTeamCtrl'},
      newBoard: {templateUrl: 'boards/boards.new-board.html', controller: 'NewBoardCtrl as newBoardCtrl'}
    };

    boardsCtrl.open = function (template) {
     var modalInstance = $uibModal.open({
       animation: boardsCtrl.animationsEnabled,
       templateUrl: boardsCtrl.modals[template].templateUrl,
       //controller: 'ModalInstanceCtrl',
       controller: boardsCtrl.modals[template].controller,
       size: 'sm',
       resolve: {
        //  items: function () {
        //    return boardsCtrl.items;
        //  },
         teams: function () {
           return boardsCtrl.teams;
         }
       }
     });

     modalInstance.result.then(function (selectedItem) {
       boardsCtrl.selected = selectedItem;
     }, function () {
       $log.info('Modal dismissed at: ' + new Date());
     });
   };

    // boardsCtrl.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
  });
