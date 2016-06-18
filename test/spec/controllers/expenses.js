'use strict';

describe('Controller: ExpensesCtrl', function () {

  // load the controller's module
  beforeEach(module('trellocloneApp'));

  var ExpensesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesCtrl = $controller('ExpensesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesCtrl.awesomeThings.length).toBe(3);
  });
});
