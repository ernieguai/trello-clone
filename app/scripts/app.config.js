'use strict';

angular.module('trellocloneApp').config(function($stateProvider, $urlRouterProvider) {

  function auth ($state, Users, Auth) {
    return Auth.$requireAuth().catch(function() {
      $state.go('register');
    });
  }

  function requireNoAuth($state, Auth) {
    return Auth.$requireAuth().then(function(auth) {
      $state.go('boards');
    }, function(error) {
      console.log(error);
    });
  }

  function profile($state, Auth, Users) {
    return Auth.$requireAuth().then(function(auth){
      return Users.getProfile(auth.uid).$loaded();
    }, function(error){
      console.log(error);
    });
  }

  function teams(Teams) { return Teams.$loaded(); }

  function boards(Boards) { return Boards.$loaded(); }

  function board($stateParams, Boards) {
    return Boards.$getRecord($stateParams.boardId);
  }

  function boardTitle($stateParams, Boards) {
    return Boards.$getRecord($stateParams.boardId).title;
  }

  function lists($stateParams, Lists) {
    return Lists.forBoard($stateParams.boardId).$loaded();
  }

  function cards(Cards) {
    return Cards.all.$loaded();
  }

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('boards', {
    url: '/',
    templateUrl: '/scripts/boards/boards.html',
    controller: 'BoardsCtrl as boardsCtrl',
    resolve: { auth:auth, teams:teams, boards:boards }
  })

  .state('board-details', {
    url: '/{boardId}/board-details',
    templateUrl: '/scripts/board-details/board-details.html',
    controller: 'BoardDetailsCtrl as boardDetailsCtrl',
    resolve: { auth:auth, profile:profile, teams:teams, boards:boards, board:board, boardTitle:boardTitle, lists:lists, cards:cards }
  })

  .state('register', {
    url: '/register',
    templateUrl: '/scripts/register/register.html',
    controller: 'RegisterCtrl as registerCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('login', {
    url: '/login',
    templateUrl: '/scripts/login/login.html',
    controller: 'LoginCtrl as loginCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('profile', {
    url: '/profile',
    templateUrl: '/scripts/profile/profile.html',
    controller: 'ProfileCtrl as profileCtrl',
    resolve: {
      auth: auth,
      profile: profile
    }
  });

})

.constant('FirebaseUrl', 'https://trello-clone-1.firebaseIO.com/');
