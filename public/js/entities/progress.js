define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Users", function(Users, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getUserProgress: function (params) {
          var defer = $.Deferred();

          setTimeout(function(){
            var data = [
              {
                discipline: {
                  disciplineId: 1,
                  title: "Kendo",
                  classes: [
                    {
                      classNum: 1,
                      disciplineId: 1,
                      instructorId: 5,
                      title: "Kendo 101",
                      description: "This class covers the basics of Kendo",
                      totalLevel: 5
                    }
                  ]
                },  
                currentClassNum: 1,
                currentLevelNum: 2,
                currentLevel: {
                  levelNum: 2,
                  title: "Basic Steps",
                  description: "Stand Straight",
                  videoUrl: "https://www.youtube.com/watch?v=cMwIMU1pWIc",
                  feedbackNeeded: false,
                  prev: 1,
                  next: 3
                },
                percentage: 3
              },
              {
                discipline: {
                  disciplineId: 2,
                  title: "QiGong",
                  classes: [
                    {
                      classNum: 1,
                      disciplineId: 2,
                      instructorId: 9,
                      title: "QiGong 101",
                      description: "This class covers the basics and the mystery of Qi",
                      totalLevel: 5
                    }
                  ]
                },  
                currentClassNum: 1,
                currentLevelNum: 3,
                currentLevel: {
                  levelNum: 3,
                  title: "Water Mill Stance",
                  description: "Position yourself like a water mill",
                  videoUrl: "https://www.youtube.com/watch?v=lIr2JzXarzs",
                  feedbackNeeded: false,
                  prev: 2,
                  next: 4
                },
                percentage: 7
              },
            ]
            defer.resolve(data);
          }, 200);

          return defer.promise();

          //var ajax = Ajax.perform({
          //  type: "GET",
          //  url: '/user/' + params.username + /progress     

          //  callback: function (data) {

          //  clean up the data;
          //    return data;
          //  }
          //});
          //
          //return ajax.promise();
        }
      };

      VirtualDojo.reqres.setHandler("entities:users:progresses", function (params) {
        return API.getUserProgress(params);
      });
    });
  }
);
