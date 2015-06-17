// var db = require('../app/config');
// var Class = require('../app/models/classes.js');
// var Discipline = require('../app/models/disciplines.js');
// var Feedback = require('../app/models/feedbacks.js');
// var Instructor = require('../app/models/instructor.js');
// var Level = require('../app/models/levels.js');
// var Progress = require('../app/models/progress.js');
// var Rank = require('../app/models/ranks.js');
// var Student = require('../app/models/student.js');


// var DBQuery = require('../utils/dbQueries.js');


// //Insert students
// var stu = [
//   {
//     username: 'Jim',
//     password: 'Jim',
//     email: 'jim@mail.com',
//     firstName: 'Jim',
//     lastName: 'Tim',
//   },
//   {
//     username: 'Yuri',
//     password: 'Yuri',
//     email: 'yuri@mail.com',
//     firstName: 'Yuri',
//     lastName: 'Shim',
//   },
//   {
//     username: 'Sokka',
//     password: 'Sokka',
//     email: 'sokka@mail.com',
//     firstName: 'Sokka',
//     lastName: 'Krim',
//   },
//   {
//     username: 'Frey',
//     password: 'Frey',
//     email: 'frey@mail.com',
//     firstName: 'Frey',
//     lastName: 'Odin',
//   },
//   {
//     username: 'Joseph',
//     password: '123',
//     email: 'Joseph@mail.com',
//     firstName: 'Joseph',
//     lastName: 'Hashir',
//   }
// ];
// // console.log('-------------------------------');
// // console.log('Students');
// // console.log('-------------------------------');
// // for(var i=0; i<stu.length; i++){
// //   DBQuery.newStudent(stu[i], function(model){
// //     console.log(model);
// //   });
// // }


// //Instructors
// var inst = [
//   {
//     username: 'Key',
//     password: 'Key',
//     email: 'key@mail.com',
//     firstName: 'Key',
//     lastName: 'Jam',
//   },
//   {
//     username: 'Quan',
//     password: 'Quan',
//     email: 'quan@mail.com',
//     firstName: 'Quan',
//     lastName: 'Qin',
//   },
//   {
//     username: 'Gandalf',
//     password: 'Gandalf',
//     email: 'gandalf@mail.com',
//     firstName: 'Gandalf',
//     lastName: 'Greybeard',
//   },
//   {
//     username: 'Morgan',
//     password: 'Morgan',
//     email: 'morgan@mail.com',
//     firstName: 'Morgan',
//     lastName: 'Lefay',
//   },
//   {
//     username: 'Jonah',
//     password: 'Jonah',
//     email: 'Jonah@mail.com',
//     firstName: 'Jonah',
//     lastName: 'Chin',
//   }
// ];

// // console.log('-------------------------------');
// // console.log('Instructor');
// // console.log('-------------------------------');
// // for(var i=0; i<inst.length; i++){
// //   DBQuery.newInstructor(inst[i], '', function(model){
// //     console.log(model);
// //   });
// // }

// var dis = [
//   {
//     title: 'KENDO',
//     description: 'The practice of Kendo increases speed, agility, flexibility, strength, endurance, and overall cardiovascular health.  With regular practice, ideal body posture is developed and the flow of the Du and Ren energetic meridians are enhanced.  Further benefits include a more efficient immune system, higher bone density, and an attuned nervous system.',
//   },
//   {
//     title: 'QIGONG',
//     description: 'Developed using traditional systems of medical exercise, fused with contemporary physiological concepts, this practice of QiGong is a safe, powerful, and fulfilling method for people looking to enhance their physical structure, mental fortitude, and emotional well-being.',
//   },
// ];

// // console.log('-------------------------------');
// // console.log('Discipline');
// // console.log('-------------------------------');
// // for(var i=0; i<dis.length; i++){
// //   DBQuery.newDiscipline(dis[i], function(model){
// //     console.log(model);
// //   });
// // }

// var clas = [
//   {
//     title: 'Kendo 101: Grip & Steps & Middle Stance',
//     description: 'Learn basic techniques and etiquette, breathing, holding of the JookDo (Bamboo Sword), standing and stepping, multiple strikes, exertion and recovery, and objectives.',
//     classNum: 1,
//     classImage: 'img/kendo_class_1.jpg',
//     classVideo: 'video/kendo_class_1.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
//   {
//     title: 'Kendo 102: Basic 12 directional steps',
//     description: 'Learn how to apply basic techniques and multiple strikes with partner practice.  Begin training while wearing protective armour.',
//     classNum: 2,
//     classImage: 'img/kendo_class_2.jpg',
//     classVideo: 'video/kendo_class_2.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
//   {
//     title: 'Kendo 103: Target hitting practice',
//     description: 'Increase attentiveness, awareness, speed, and accuracy while sparring with partners.  Enhance calmness and mental clarity during intense physical exertion.',
//     classNum: 3,
//     classImage: 'img/kendo_class_3.jpg',
//     classVideo: 'video/kendo_class_3.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
//   {
//     title: 'Kendo 104: Sparring basics',
//     description: 'TBA Spring, 2016',
//     classNum: 4,
//     classImage: 'img/kendo_class_4.jpg',
//     classVideo: 'video/kendo_class_4.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
//   {
//     title: 'Kendo 105: Sparring Intermediate',
//     description: 'TBA Spring, 2016',
//     classNum: 5,
//     classImage: 'img/kendo_class_5.jpg',
//     classVideo: 'video/kendo_class_5.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
//   {
//     title: "Kendo 106: Instructor's program",
//     description: 'TBA Spring, 2016',
//     classNum: 6,
//     classImage: 'img/kendo_class_6.jpg',
//     classVideo: 'video/kendo_class_6.mp4',
//     discipline_id: 1,
//     instructor_id: 5,
//   },
// // ====================================================
//   {
//     title: 'Qigong 101: Philosophy of Qigong',
//     description: 'In this class, we will explain what Qigong is, how it works, who should do it, and the benefits one can reap from a regular practice. This workshop will provide foundational exercises to increase the strength, nerve sensitivity, and balance.',
//     classNum: 1,
//     classImage: 'img/qigong_class_1.jpg',
//     classVideo: 'video/qigong_class_1.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
//   {
//     title: 'Qigong 102: 7 Star Stance, 5 Elemental Stance',
//     description: 'In this class, we will explain what Qigong is, how it works, who should do it, and the benefits one can reap from a regular practice. This workshop will provide foundational exercises to increase the strength, nerve sensitivity, and balance.',
//     classNum: 2,
//     classImage: 'img/qigong_class_2.jpg',
//     classVideo: 'video/qigong_class_2.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
//   {
//     title: 'Qigong 103:',
//     description: 'Increase attentiveness, awareness, speed, and accuracy while sparring with partners.  Enhance calmness and mental clarity during intense physical exertion.',
//     classNum: 3,
//     classImage: 'img/qigong_class_3.jpg',
//     classVideo: 'video/qigong_class_3.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
//   {
//     title: 'Qigong 104:',
//     description: 'TBA Spring, 2016',
//     classNum: 4,
//     classImage: 'img/qigong_class_4.jpg',
//     classVideo: 'video/qigong_class_4.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
//   {
//     title: 'Qigong 105:',
//     description: 'TBA Spring, 2016',
//     classNum: 5,
//     classImage: 'img/qigong_class_5.jpg',
//     classVideo: 'video/qigong_class_5.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
//   {
//     title: "Qigong 106:",
//     description: 'TBA Spring, 2016',
//     classNum: 6,
//     classImage: 'img/qigong_class_6.jpg',
//     classVideo: 'video/qigong_class_6.mp4',
//     discipline_id: 2,
//     instructor_id: 5,
//   },
// ];




// // DBQuery.newClass(clas[0], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[1], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[2], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[3], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[4], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[5], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[6], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[7], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[8], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[9], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[10], function(model){
// // console.log('Make class');
// // console.log(model);
// // DBQuery.newClass(clas[11], function(model){
// // console.log('Make class');
// // console.log(model);

// // });
// // });
// // });
// // });
// // });
// // });
// // });
// // });
// // });
// // });
// // });
// // });



// var levl = {
//   title: 'Introduction to the art of swordfighting and qigong',
//   description: "Discipline is the acknowledgement of human mind's infinite potential and devotion to self-improvement and transformation through perseverance and practice.",
//   videoURL: 'https://www.youtube.com/embed/207ePUiLV_A',
//   feedbackNeeded: false,
//   levelNum: 1,
//   class_id: 12,
// };
// var levl2 = {
//   title: 'Introduction to the art of swordfighting and qigong',
//   description: "Discipline is the acknowledgement of human mind's infinite potential and devotion to self-improvement and transformation through perseverance and practice.",
//   videoURL: 'https://www.youtube.com/embed/207ePUiLV_A',
//   feedbackNeeded: false,
//   levelNum: 2,
//   class_id: 12,
// };
// var levl3 = {
//   title: 'Introduction to the art of swordfighting and qigong',
//   description: "Discipline is the acknowledgement of human mind's infinite potential and devotion to self-improvement and transformation through perseverance and practice.",
//   videoURL: 'https://www.youtube.com/embed/207ePUiLV_A',
//   feedbackNeeded: false,
//   levelNum: 3,
//   class_id: 12,
// };
// var levl4 = {
//   title: 'Introduction to the art of swordfighting and qigong',
//   description: "Discipline is the acknowledgement of human mind's infinite potential and devotion to self-improvement and transformation through perseverance and practice.",
//   videoURL: 'https://www.youtube.com/embed/207ePUiLV_A',
//   feedbackNeeded: false,
//   levelNum: 4,
//   class_id: 12,
// };
// var levl5 = {
//   title: 'Introduction to the art of swordfighting and qigong',
//   description: "Discipline is the acknowledgement of human mind's infinite potential and devotion to self-improvement and transformation through perseverance and practice.",
//   videoURL: 'https://www.youtube.com/embed/207ePUiLV_A',
//   feedbackNeeded: true,
//   levelNum: 5,
//   class_id: 12,
// };

// // console.log('-------------------------------');
// // console.log('Levels');
// // console.log('-------------------------------');
// // DBQuery.newLevel(levl, function(model){
// //   console.log(model);
// //   DBQuery.newLevel(levl2, function(model){
// //   console.log(model);
// //   DBQuery.newLevel(levl3, function(model){
// //   console.log(model);
// //   DBQuery.newLevel(levl4, function(model){
// //   console.log(model);
// //   DBQuery.newLevel(levl5, function(model){
// //   console.log(model);
  
// // });
// // });
// // });
// // });
// // });

// var rank = {
//   rankTitle: 'Beginner - 2',
//   rankNum: 2,
//   rankIcon: 'rankBeginnerIcon',
//   student_id: 6,
//   instructor_id: null,
//   discipline_id: 1,
// };

// var rank2 = {
//   rankTitle: 'Beginner - 2',
//   rankNum: 2,
//   rankIcon: 'rankBeginnerIcon',
//   student_id: 6,
//   instructor_id: null,
//   discipline_id: 2,
// };

// var rankInst = {
//   rankTitle: 'Master - 6',
//   rankNum: 6,
//   rankIcon: 'rankBeginnerIcon',
//   student_id: null,
//   instructor_id: 5,
//   discipline_id: 1,
// };

// // DBQuery.setRank(rank, false, function(data){
// //   console.log(data);
// // })
// // DBQuery.setRank(rank2, false, function(data){
// //   console.log(data);
// // })

// // DBQuery.setProgress('Joseph', 'Qigong 102: 7 Star Stance, 5 Elemental Stance', 5, 
// //   function(data){
// //     console.log(data);
// //   }
// // );
// // DBQuery.setProgress('Joseph', 'Kendo 102: Basic 12 directional steps', 5, 
// //   function(data){
// //     console.log(data);
// //   }
// // );


// // DBQuery.studentToClass('Joseph', 'Kendo 102: Basic 12 directional steps', 
// //   function(data){
// //     console.log(data);
// //   }
// // );
// // DBQuery.studentToClass('Joseph', 'Qigong 102: 7 Star Stance, 5 Elemental Stance', 
// //   function(data){
// //     console.log(data);
// //   }
// // );


// new Student()
// .query(
//   'select', 
//   ['id', 'username']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Student')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){
//     console.log(model.attributes);
//   })
// });

// new Instructor()
// .query(
//   'select', 
//   ['id', 'username']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Instructor')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){
//     console.log(model.attributes);
//   })
// });

// new Discipline()
// .query(
//   'select', 
//   ['id', 'title', 'classCount']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Discipline')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){
//     console.log(model.attributes);
//   })
// });

// new Class()
// .query(
//   'select', 
//   ['id', 'title', 'classNum', 'levelCount']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Class')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){

//     console.log(model.attributes);
//   })
// });

// // new Level()
// // .query(
// //   'select', 
// //   ['id', 'title', 'levelNum']
// // )
// // .fetchAll()
// // .then(function(collection){
// //   console.log('------------------------------');
// //   console.log('Level')
// //   console.log('------------------------------');
// //   collection.models.forEach(function(model){

// //     console.log(model.attributes);
// //   })
// // });

// new Rank()
// .query(
//   'select', 
//   ['rankTitle', 'rankNum', 'student_id', 'discipline_id']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Ranks')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){

//     console.log(model.attributes);
//   })
// });

// new Progress()
// .query(
//   'select', 
//   ['student_id', 'class_id', 'levelNum']
// )
// .fetchAll()
// .then(function(collection){
//   console.log('------------------------------');
//   console.log('Progress')
//   console.log('------------------------------');
//   collection.models.forEach(function(model){

//     console.log(model.attributes);
//   })
// });


// // DBQuery.clearTable('disciplines');
// // DBQuery.clearTable('classes');








