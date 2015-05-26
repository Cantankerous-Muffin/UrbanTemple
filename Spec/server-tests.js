var expect = require('chai').expect;
var db = require('../app/config');
var Students = require('../app/models/student');
console.log('students',Students);

// Can run DB queries inside HTTP requests for information in the DB.
beforeEach(function() {
	new Students({
		username: 'jim'
	}).fetch().then(function(a){console.log('a')});
});

describe("DB tests", function() {
  var a;

  it("put a value in the database and query it", function() {
    a = true;
    expect(a).to.equal(true);
  });
});