'use strict';

describe('Controller: TimesheetsCtrl', function () {

  // load the controller's module
  beforeEach(module('frinvoiceApp'));

  var TimesheetsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimesheetsCtrl = $controller('TimesheetsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TimesheetsCtrl.awesomeThings.length).toBe(3);
  });
});
