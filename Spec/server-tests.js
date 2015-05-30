var expect = require('chai').expect;
var request = require('request');


var db = require('../app/config');
var Students = require('../app/models/student.js');
var Instructors = require('../app/models/instructor.js');
var Classes = require('../app/models/classes.js');
var DBQuery = require('../utils/dbQueries.js');

describe('DB Testing:', function(){
  beforeEach(function() {
      // log out currently signed in user
      request('http://127.0.0.1:5000/logout', function(error, res, body) {});
      // this.timeout(3000);
      // delete link for roflzoo from db so it can be created later for the test
      db.knex('students')
        .where('username', '=', 'Phillip')
        .del()
        .catch(function(error) {
          throw {
            type: 'DatabaseError',
            message: 'Failed to create test setup data'
          };
        });
      db.knex('students')
      .where('username', '=', 'jim')
      .del()
      .catch(function(error) {
        throw {
          type: 'DatabaseError',
          message: 'Failed to create test setup data'
        };
      });


    });
  describe('Link creation:', function(){
    var requestWithSession = request.defaults({jar: true});

    beforeEach(function(done){      // create a user that we can then log-in with
      this.timeout(3000);
          new Students({
              'username': 'jim',
              'password': 'jim'
          }).save().then(function(){
            var options = {
              'method': 'POST',
              'followAllRedirects': true,
              'uri': 'http://127.0.0.1:5000/auth/login',
              'json': {
                'username': 'jim',
                'password': 'jim'
              }
            };
            // login via form and save session info
            requestWithSession(options, function(error, res, body) {
              done();
            });
          });
        });

    it('Redirects to login page if a student tries to access the main page and is not signed in', function(done) {
      request('http://127.0.0.1:5000/', function(error, res, body) {
        expect(res.req.path).to.equal('/');
        done();
      });
    });

    it('Redirects to login page if a student tries to go to dashboard, and is not signed in', function(done) {
      request('http://127.0.0.1:5000/dashboard', function(error, res, body) {
        expect(res.req.path).to.equal('/auth/login');
        done();
      });
    });

  });

  describe('Account Creation:', function(){

      it('Signup creates a student record', function(done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:5000/auth/signup',
          'json': {
            'username': 'Svnh',
            'password': 'Svnh'
          }
        };

        this.timeout(3000);
        request(options, function(error, res, body) {
          db.knex('students')
            .where('username', '=', 'Svnh')
            .then(function(res) {
              if (res[0] && res[0]['username']) {
                var user = res[0]['username'];
              }
              expect(user).to.equal('Svnh');
              done();
            }).catch(function(err) {
              throw {
                type: 'DatabaseError',
                message: 'Failed to create test setup data'
              };
            });
        });
      });

      it('Signup logs in a new student', function(done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:5000/auth/signup',
          'json': {
            'username': 'Phillip',
            'password': 'Phillip'
          }
        };

        request(options, function(error, res, body) {
          expect(res.headers.location).to.equal('/dashboard');
          done();
        });
      });

    }); // 'Account Creation'

    describe('Account Login:', function(){

      var requestWithSession = request.defaults({jar: true});

      beforeEach(function(done){
        this.timeout(3000);
        new Students({
            'username': 'Phillip',
            'password': 'Phillip'
        }).save().then(function(){
          done()
        });
      })

      it('Logs in existing students', function(done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:5000/auth/login',
          'json': {
            'username': 'ggg',
            'password': 'ggg'
          }
        };

        requestWithSession(options, function(error, res, body) {
          expect(res.headers.location).to.equal('/dashboard');
          done();
        });
      });

      it('Students that do not exist are kept on login page', function(done) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:5000/auth/login',
          'json': {
            'username': 'Fred',
            'password': 'Fred'
          }
        };

        requestWithSession(options, function(error, res, body) {
          expect(res.headers.location).to.equal('/auth/login');
          done();
        });
      });

    }); // 'Account Login'

});
