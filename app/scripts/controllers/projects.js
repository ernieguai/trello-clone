'use strict';

/**
 * @ngdoc function
 * @name frinvoiceApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the frinvoiceApp
 */
angular.module('frinvoiceApp')
  .controller('ProjectsCtrl', function ($state, Auth, Users, projects) {
    var projectsCtrl = this;

    // expose the resolved variables
    projectsCtrl.projects = projects;

    // Create a new project
    projectsCtrl.newProject = {
      name: ''
    };

    projectsCtrl.createProject = function () {
      projectsCtrl.projects.$add(projectsCtrl.newProject).then(function() {
        projectsCtrl.newProject = {
          name: ''
        };
        console.log('success');
        $state.go('projects');
      }, function (error) {
        console.log('error', error);
      });
    };

    // Create a new project
    // projectsCtrl.newProject = {
    //   client: '',
    //   projectName: '',
    //   projectCode: '',
    //   startDate: '',
    //   endDate: '',
    //   notes: '',
    //   invoiceFlag: '',
    //   invoiceMethod: '',
    //   budget: {
    //     flag: '',
    //     hours: '',
    //     emailAlertsFlag: '',
    //     emailAlertsPercentage: ''
    //   },
    //   permissions: '',
    //   tasks: {
    //     name: [],
    //     billable: []
    //   },
    //   team: {
    //     name: '',
    //     projectManager: '',
    //     billableRate: ''
    //   }
    // };

    // projectsCtrl.createProject = function () {
    //   projectsCtrl.projects.$add(projectsCtrl.newProject).then(function() {
    //     projectsCtrl.newProject = {
    //       client: '',
    //       projectName: '',
    //       projectCode: '',
    //       startDate: '',
    //       endDate: '',
    //       notes: '',
    //       invoiceFlag: '',
    //       invoiceMethod: '',
    //       budget: {
    //         flag: '',
    //         hours: '',
    //         emailAlertsFlag: '',
    //         emailAlertsPercentage: ''
    //       },
    //       permissions: '',
    //       tasks: {
    //         name: [],
    //         billable: []
    //       },
    //       team: {
    //         name: '',
    //         projectManager: '',
    //         billableRate: ''
    //       }
    //     };
    //   });
    // };

  });
