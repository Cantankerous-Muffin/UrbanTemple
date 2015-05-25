var db = require('../app/config');
var Students = require('../app/models/student');

console.log('Gets to tests');
describe("DB tests", function() {
  var a;

  it("put a value in the database and query it", function() {
  	console.log('This gets called');

    a = true;
    expect(a).toBe(true);
  });
});