'use strict';

angular.module('trellocloneApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  function auth ($state, Users, Auth) {
    return Auth.$requireAuth().catch(function() {
      $state.go('main');
    });
  }

  function requireNoAuth ($state, Auth) {
    return Auth.$requireAuth().then(function(auth) {
      $state.go('timesheets');
    }, function(error) {
      return;
    });
  }

  function profile ($state, Auth, Users) {
    return Auth.$requireAuth().then(function(auth){
      return Users.getProfile(auth.uid).$loaded();
    }, function(error){
      $state.go('main');
    });
  }

  //$locationProvider.html5Mode(true);
  //$locationProvider.html5Mode({ enabled: true, requireBase: false });
  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('main', {
    url: '/',
    templateUrl: '/views/main.html',
    controller: 'MainCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('register', {
    url: '/register',
    templateUrl: '/register/register.html',
    controller: 'AuthCtrl as authCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('login', {
    url: '/login',
    templateUrl: '/login/login.html',
    controller: 'AuthCtrl as authCtrl',
    resolve: { requireNoAuth: requireNoAuth }
  })

  .state('projects', {
    url: '/projects',
    templateUrl: '/views/projects.html',
    controller: 'ProjectsCtrl as projectsCtrl',
    resolve: {
      projects: function (Projects){
        // todo: projects should be for members of that company only!!
        return Projects.$loaded();
      },
      auth: auth
    }
  })

  .state('create-project', {
    url: '/create-project',
    templateUrl: '/views/create-project.html',
    controller: 'ProjectsCtrl as projectsCtrl',
    resolve: {
      projects: function(Projects) {
        // todo: projects should be for members of that company only!!
        return Projects.$loaded();
      },
      auth: auth
    }
  })

  .state('profile', {
    url: '/profile',
    templateUrl: '/views/profile.html',
    controller: 'ProfileCtrl as profileCtrl',
    resolve: {
      auth: auth,
      profile: profile
    }
  })

  //-----------------------------------------
  // SETTINGS VIEW AND SUBVIEWS
  //-----------------------------------------

  .state('settings', {
    url: '/settings',
    templateUrl: '/views/settings.html',
    controller: 'SettingsCtrl as settingsCtrl',
    resolve: { auth: auth }
  })

  .state('settings.edit-credit-card', {
    url: '/edit-credit-card',
    templateUrl: '/views/settings.edit-credit-card.html',
    controller: 'SettingsCtrl as settingsCtrl'
  })

  //-----------------------------------------
  // TIMESHEETS VIEW AND SUBVIEWS
  //-----------------------------------------

  .state('timesheets', {
    url: '/timesheets',
    templateUrl: '/views/timesheets.html',
    controller: 'TimesheetsCtrl as timesheetsCtrl',
    resolve: {
      auth: auth,
      projects: function (Projects) {
        // todo: projects should be for members of that company only!!
        return Projects.$loaded();
      },
      timesheets: function (Timesheets) {
        // TODO: need to refactor this - only return timesheets for user and company / client (return all clients!!) Let user choose client / project name when creating a new timesheet
        // also return only for date range
        // return Timesheets.forUsers(profile.$id).loaded();
        return Timesheets.$loaded();
      }
      // timesheets: function ($stateParams, Timesheets) {
      //   // TODO: need to refactor this, removing the stateParams
      //   return Timesheets.forProject($stateParams.$channelId).$loaded();
      // }
    }
  })

  .state('timesheets.time', {
    url: '/time',
    templateUrl: '/views/timesheets.time.html',
    controller: 'TimesheetsCtrl as timesheetsCtrl'
  })

  .state('timesheets.expenses', {
    url: '/expenses',
    templateUrl: '/views/timesheets.expenses.html',
    controller: 'TimesheetsCtrl as timesheetsCtrl'
  })

  // .state('timesheets', {
  //   //url: '/timesheets',
  //   url: '/{projectId}/timesheets',
  //   templateUrl: '/views/timesheets.html',
  //   controller: 'TimesheetsCtrl as timesheetsCtrl',
  //   resolve: {
  //     timesheets: function ($stateParams, Timesheets) {
  //       return Timesheets.forProject($stateParams.projectId).$loaded();
  //     },
  //     projectName: function ($stateParams, projects) {
  //       return '#' + projects.$getRecord($stateParams.projectId).name;
  //     }
  //   }
  // })

  //-----------------------------------------
  // REPORTS VIEW AND SUBVIEWS
  //-----------------------------------------

  .state('reports', {
    url: '/reports',
    templateUrl: '/views/reports.html',
    controller: 'ReportsCtrl as reportsCtrl',
    resolve: { auth: auth }
  })

  .state('reports.time', {
    url: '/time',
    templateUrl: '/views/reports.time.html',
    controller: 'ReportsCtrl as reportsCtrl'
  })

  .state('reports.detailed-time', {
    url: '/detailed-time',
    templateUrl: '/views/reports.detailed-time.html',
    controller: 'ReportsCtrl as reportsCtrl'
  })

  .state('reports.uninvoiced', {
    url: '/uninvoiced',
    templateUrl: '/views/reports.uninvoiced.html',
    controller: 'ReportsCtrl as reportsCtrl'
  })

  .state('reports.expenses', {
    url: '/expenses',
    templateUrl: '/views/reports.expenses.html',
    controller: 'ReportsCtrl as reportsCtrl'
  })

  //-----------------------------------------
  // INVOICES VIEW AND SUBVIEWS
  //-----------------------------------------

  .state('invoices', {
    url: '/invoices',
    templateUrl: '/views/invoices.html',
    controller: 'InvoicesCtrl as invoicesCtrl',
    resolve: { auth: auth }
  })

  .state('invoices.overview', {
    url: '/overview',
    templateUrl: '/views/invoices.overview.html',
    controller: 'InvoicesCtrl as invoicesCtrl'
  })

  .state('invoices.report', {
    url: '/report',
    templateUrl: '/views/invoices.report.html',
    controller: 'InvoicesCtrl as invoicesCtrl'
  })

  .state('invoices.recurring', {
    url: '/recurring',
    templateUrl: '/views/invoices.recurring.html',
    controller: 'InvoicesCtrl as invoicesCtrl'
  })

  .state('invoices.retainers', {
    url: '/retainers',
    templateUrl: '/views/invoices.retainers.html',
    controller: 'InvoicesCtrl as invoicesCtrl'
  })

  .state('invoices.configure', {
    url: '/configure',
    templateUrl: '/views/invoices.configure.html',
    controller: 'InvoicesCtrl as invoicesCtrl'
  })

  //-----------------------------------------
  // MANAGE VIEW AND SUBVIEWS
  //-----------------------------------------

  .state('manage', {
    url: '/manage',
    templateUrl: '/views/manage.html',
    controller: 'ManageCtrl as manageCtrl',
    resolve: { auth: auth }
  })

  .state('manage.people', {
    url: '/people',
    templateUrl: '/views/manage.people.html',
    controller: 'ManageCtrl as manageCtrl'
  })

  .state('manage.clients', {
    url: '/clients',
    templateUrl: '/views/manage.clients.html',
    controller: 'ManageCtrl as manageCtrl'
  })

  .state('manage.tasks', {
    url: '/tasks',
    templateUrl: '/views/manage.tasks.html',
    controller: 'ManageCtrl as manageCtrl'
  })

  .state('manage.expense-categories', {
    url: '/expense-categories',
    templateUrl: '/views/manage.expense-categories.html',
    controller: 'ManageCtrl as manageCtrl'
  });

})

.constant('FirebaseUrl', 'https://trello-clone-1.firebaseIO.com/');
