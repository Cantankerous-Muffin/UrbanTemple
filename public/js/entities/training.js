define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Users", function(Users, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getTraining: function (params) {
          // var defer = $.Deferred();

          // setTimeout(function(){
          //   var data = [
          //               {
          //                 discipline_id: 1,
          //                 title: "Kendo",
          //                 description: "kendo short description will be here",
          //                 classData: [
          //                   {
          //                     classNum: 1,
          //                     disciplineId: 1,
          //                     instructorId: 1,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 101: Grip & Steps & Middle Stance",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_1.jpg",
          //                     classVideo: "video/kendo_class_1.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 2,
          //                     disciplineId: 1,
          //                     instructorId: 2,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 102: Basic 12 directional steps",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_2.jpg",
          //                     classVideo: "video/kendo_class_2.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 3,
          //                     disciplineId: 1,
          //                     instructorId: 3,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 103: Target hitting practice",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_3.jpg",
          //                     classVideo: "video/kendo_class_3.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 4,
          //                     disciplineId: 1,
          //                     instructorId: 4,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 104: Sparring basics",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_4.jpg",
          //                     classVideo: "video/kendo_class_4.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 5,
          //                     disciplineId: 1,
          //                     instructorId: 5,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 105: Sparring Intermediate",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_5.jpg",
          //                     classVideo: "video/kendo_class_5.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 6,
          //                     disciplineId: 1,
          //                     instructorId: 6,
          //                     instructorName: "Pranav",
          //                     instructorRank: 5,
          //                     instructorRankTitle: "Master",
          //                     title: "Kendo 106: Instructor's program",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/kendo_class_6.jpg",
          //                     classVideo: "video/kendo_class_6.mp4",
          //                     totalLevel: 5
          //                   }
          //                 ]
          //               },
          //               {
          //                 disciplineId: 2,
          //                 title: "QiGong",
          //                 description: "Qigong short description will be here",
          //                 classData: [
          //                         {

          //                            classNum: 1,
          //                 disciplineId: 1,
          //                 instructorId: 1,
          //                 instructorName: "Pranav",
          //                 instructorRank: 5,
          //                 instructorRankTitle: "Master",
          //                 title: "Philosophy of Sword Fighting",
          //                 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
          //                 classImage: "img/kendo_class_1.jpg",
          //                 totalLevel: 5


          //                     classNum: 1,
          //                     disciplineId: 2,
          //                     instructorId: 1,
          //                     title: "Qigong 101: Philsophy",
          //                     description: "This class covers the basics of Qigong",
          //                     classImage: "img/qigong_class_1.jpg",
          //                     classVideo: "video/qigong_class_1.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 2,
          //                     disciplineId: 2,
          //                     instructorId: 2,
          //                     title: "Qigong 102: Grip & Steps & Middle Stance ",
          //                     description: "This class covers the basics of Qigong",
          //                     classImage: "img/qigong_class_2.jpg",
          //                     classVideo: "video/qigong_class_2.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 3,
          //                     disciplineId: 2,
          //                     instructorId: 3,
          //                     title: "Qigong 103: Strikes - Basic",
          //                     description: "This class covers the basics of Qigong",
          //                     classImage: "img/qigong_class_3.jpg",
          //                     classVideo: "video/qigong_class_3.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 4,
          //                     disciplineId: 2,
          //                     instructorId: 4,
          //                     title: "Qigong 104: Strikes - Intermediate",
          //                     description: "This class covers the basics of Qigong",
          //                     classImage: "img/qigong_class_4.jpg",
          //                     classVideo: "video/qigong_class_4.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 5,
          //                     disciplineId: 2,
          //                     instructorId: 5,
          //                     title: "Qigong 105: Strikes - Advanced",
          //                     description: "This class covers the basics of Qigong",
          //                     classImage: "img/qigong_class_5.jpg",
          //                     classVideo: "video/qigong_class_5.mp4",
          //                     totalLevel: 5
          //                   },
          //                   {
          //                     classNum: 6,
          //                     disciplineId: 2,
          //                     instructorId: 6,
          //                     title: "Kendo 106: Sparring",
          //                     description: "This class covers the basics of Kendo",
          //                     classImage: "img/qigong_class_6.jpg",
          //                     classVideo: "video/qigong_class_6.mp4",
          //                     totalLevel: 5
          //                   }
          //                 ]
          //               }
          //             ]


          //   defer.resolve(data);
          // }, 200);

          // return defer.promise();

          var ajax = Ajax.perform({
           type: "GET",
           url: 'api/discipline',
           callback: function (data) {
             return data;
           }
          });
          
          return ajax.promise();
        }
      };

      VirtualDojo.reqres.setHandler("entities:training:get", function (params) {
        return API.getTraining(params);
      });
    });
  }
);
