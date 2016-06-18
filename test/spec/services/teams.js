'use strict';

describe('Service: Teams', function () {

  // load the service's module
  beforeEach(module('trellocloneApp'));

  // instantiate service
  var Teams;
  beforeEach(inject(function (_Teams_) {
    Teams = _Teams_;
  }));

  it('should do something', function () {
    expect(!!Teams).toBe(true);
  });

});
