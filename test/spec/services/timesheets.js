'use strict';

describe('Service: timesheets', function () {

  // load the service's module
  beforeEach(module('trellocloneApp'));

  // instantiate service
  var timesheets;
  beforeEach(inject(function (_timesheets_) {
    timesheets = _timesheets_;
  }));

  it('should do something', function () {
    expect(!!timesheets).toBe(true);
  });

});
