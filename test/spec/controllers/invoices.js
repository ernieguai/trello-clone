'use strict';

describe('Controller: InvoicesCtrl', function () {

  // load the controller's module
  beforeEach(module('frinvoiceApp'));

  var InvoicesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvoicesCtrl = $controller('InvoicesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InvoicesCtrl.awesomeThings.length).toBe(3);
  });
});
