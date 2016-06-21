'use strict';

angular.module('trellocloneApp').config(function($stateProvider, $urlRouterProvider) {

  function auth ($state, Users, Auth) {
    return Auth.$requireAuth().catch(function() {
      $state.go('register');
    });
  }

  function requireNoAuth ($state, Auth) {
    return Auth.$requireAuth().then(function(auth) {
      $state.go('boards');
    }, function(error) {
      return;
    });
  }

  function profile ($state, Auth, Users) {
    return Auth.$requireAuth().then(function(auth){
      return Users.getProfile(auth.uid).$loaded();
    }, function(error){
      // send user to profile page to fill out details
      // $state.go('main');
    });
  }

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('boards', {
    url: '/',
    templateUrl: '/boards/boards.html',
    controller: 'BoardsCtrl as boardsCtrl',
    resolve: {
      auth: auth,
      teams: function (Teams) {
        return Teams.$loaded();
      },
      boards: function (Boards) {
        return Boards.$loaded();
      }
    }
  })

  .state('board-details', {
    url: '/{boardId}/board-details',
    templateUrl: '/board-details/board-details.html',
    controller: 'BoardDetailsCtrl as boardDetailsCtrl',
    resolve: {
      auth: auth,
      profile: profile,
      teams: function (Teams) {
        return Teams.$loaded();
      },
      boards: function (Boards) {
        return Boards.$loaded();
      },
      lists: function($stateParams, Lists) {
        return Lists.forBoard($stateParams.boardId).$loaded();
      },
      // cards: function(Cards, profile, $stateParams) {
      //   return Cards.forUser($stateParams.uid, profile.$id).loaded();
      // },
      cards: function (Cards) {
        return Cards.all.$loaded();
      },
      boardTitle: function($stateParams, Boards) {
        return Boards.$getRecord($stateParams.boardId).title;
      },
      board: function($stateParams, Boards) {
        return Boards.$getRecord($stateParams.boardId);
      },
    }
  })

  .state('register', {
    url: '/register',
    templateUrl: '/register/register.html',
    controller: 'RegisterCtrl as registerCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('login', {
    url: '/login',
    templateUrl: '/login/login.html',
    controller: 'LoginCtrl as loginCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('profile', {
    url: '/profile',
    templateUrl: '/profile/profile.html',
    controller: 'ProfileCtrl as profileCtrl',
    resolve: {
      auth: auth,
      profile: profile
    }
  });

})

.constant('FirebaseUrl', 'https://trello-clone-1.firebaseIO.com/');
