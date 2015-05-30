var expect = require('chai').expect;


var db = require('../app/config');
var Students = require('../app/models/student.js');
var Instructors = require('../app/models/instructor.js');
var Classes = require('../app/models/classes.js');
var DBQuery = require('../utils/dbQueries.js');


describe('DB Testing:', function(){
    //Set the timeout for each 'it' test
    this.timeout(2000);

  var Chai = {
    username: 'Chai',
    password: 'chai',
    email: 'chai@mail.com',
    firstName: 'Chai',
    lastName: 'Mocha'
  };
  //Make sure student 'Chai' does not exist
  before(function(done){
    DBQuery.delStudent('Chai', function(data){
      if(!data){
        DBQuery.delInstructor('Chai', function(data){
          done();
        });
      }else{
        done();
      }
    });
  });

  it('should insert "Chai" as student user', function(done){

    DBQuery.newStudent(Chai, function(success){
      if(success){
        DBQuery.getStudentUsing('username', Chai.username, function(data){
          expect(data.username).to.equal('Chai');
          expect(data.email).to.equal('chai@mail.com');
          expect(data.firstName).to.equal('Chai');
          expect(data.lastName).to.equal('Mocha');
          done();
        });
      }
      // db.knex('students')
      // .where('username', 'Chai')
      // .select('*')
      // .catch(function(err){
      //   console.log('Error: ',err);
      // })
      // .then(function(data){
      //   expect(data[0].username).to.equal('Chai');
      //   expect(data[0].email).to.equal('chai@mail.com');
      //   expect(data[0].firstName).to.equal('Chai');
      //   expect(data[0].lastName).to.equal('Mocha');

      //   done();
      // });
    });
  });

  it('should not be able to register as Instructor with "Chai" username', function(done){
    // this.timeout(4000);
    DBQuery.newInstructor(Chai, function(data){
      expect(data).to.equal(false);
      done();
    });
  });

  it('should remove "Chai" as student user', function(done){
    // this.timeout(4000);

    DBQuery.delStudent('Chai', function(data){
      db.knex('students')
      .where('username', 'Chai')
      .select('*')
      .catch(function(err){
        console.log('Error: ',err);
      })
      .then(function(data){
        expect(data.length).to.equal(0);

        done();
      });
    });
  });

  it('should insert "Chai" as instructor', function(done){
    // this.timeout(4000);
    DBQuery.newInstructor(Chai, function(data){
      db.knex('instructors')
      .where('username', 'Chai')
      .select('*')
      .catch(function(err){
        console.log('Error: ',err);
      })
      .then(function(data){
        expect(data[0].username).to.equal('Chai');
        expect(data[0].email).to.equal('chai@mail.com');
        expect(data[0].firstName).to.equal('Chai');
        expect(data[0].lastName).to.equal('Mocha');

        done();
      });
    });
  });

  it('should not be able to register as Student with "Chai" username', function(done){
    // this.timeout(4000);
    DBQuery.newStudent(Chai, function(data){
      expect(data).to.equal(false);
      done();
    });
  });

  it('should remove "Chai" as instructor user', function(done){
    // this.timeout(4000);

    DBQuery.delInstructor('Chai', function(data){
      db.knex('instructors')
      .where('username', 'Chai')
      .select('*')
      .catch(function(err){
        console.log('Error: ',err);
      })
      .then(function(data){
        expect(data.length).to.equal(0);

        done();
      });
    });
  });

});

