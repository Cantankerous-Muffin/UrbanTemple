define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Feedbacks", function(Feedbacks, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getFeedback: function(params) {
          console.log("feedback params", params);
          var defer = $.Deferred();
          //from route: /discipline/<discipline_id>/class/<class_num>/level/<level_num>

          setTimeout(function(){
            var data = {
              feedbackId: 30,
              studentUsername: "Raymond Luong ",
              instrUsername: "Ken Kang",
              videoUrl: "https://www.youtube.com/embed/Q33SoblaZbU",
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
              class: {
                      classNum: 4,
                      disciplineId: 1,
                      instructorId: 14,
                      instructorName: "Ken Kang", 
                      instructorRank: 5,
                      instructorRankTitle: "Master",
                      title: "kendo 101",
                      description: "description",
                      classImage: "class img",
                      totalLevel: 5
                     },
              approved: false,
            }

            defer.resolve(data);
          }, 200);

          // var ajax = Ajax.perform({
          //    type: "GET",
          //    url: '/discipline',
          //    callback: function (data) {
          //      return data;
          //    }
          //   });
            
          //   return ajax.promise();

          return defer.promise();
        },

        getUserFeedbacks: function(params) {
          var defer = $.Deferred();
          //from route: /discipline/<discipline_id>/class/<class_num>/level/<level_num>

          setTimeout(function(){
            var data = [
                        {
                          feedbackId: 30,
                          studentUsername: "Raymond Luong ",
                          instructorName: "Ken Kang",
                          videoUrl: "https://www.youtube.com/embed/Q33SoblaZbU",
                          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                          class: {
                                  classNum: 4,
                                  disciplineId: 1,
                                  instructorId: 14,
                                  instructorName: "Ken Kang", 
                                  instructorRank: 5,
                                  instructorRankTitle: "Master",
                                  title: "kendo 104",
                                  description: "description",
                                  classImage: "class img",
                                  totalLevel: 5
                                 },
                          approved: false,
                        },
                        {
                          feedbackId: 40,
                          studentUsername: "Raymond Luong ",
                          instructorName: "Pranav",
                          videoUrl: "https://www.youtube.com/embed/Q33SoblaZbU",
                          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                          class: {
                                  classNum: 5,
                                  disciplineId: 2,
                                  instructorId: 17,
                                  instructorName: "Pranav", 
                                  instructorRank: 7,
                                  instructorRankTitle: "Instructor",
                                  title: "Qigong 105",
                                  description: "description",
                                  classImage: "class img",
                                  totalLevel: 5
                                 },
                          approved: false,
                        }
                      ];
            defer.resolve(data);
          }, 200);

          // var ajax = Ajax.perform({
          //    type: "GET",
          //    url: '/discipline',
          //    callback: function (data) {
          //      return data;
          //    }
          //   });
            
          //   return ajax.promise();

          return defer.promise();
        },

        postFeedback: function(reqData) {
          var defer = $.Deferred();
          console.log("feedfeed", reqData);

          // var ajax = Ajax.perform({
          //   type: "POST",
          //   url: '/feedback/submit',
          //   data: reqData,
          //   callback: function (data) {
          //     return data;
          //   }
          // });
          // return ajax.promise();

          setTimeout(function(){
            var data = {
              feedbackId: 35,
              studentUsername: "Jimmy",
              instrUsername: "Ken Kang",
              videoUrl: "https://www.youtube.com/embed/Q33SoblaZbU",
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
              class: {
                      classNum: 4,
                      disciplineId: 1,
                      instructorId: 14,
                      instructorName: "Ken Kang", 
                      instructorRank: 5,
                      instructorRankTitle: "Master",
                      title: "kendo 101",
                      description: "description",
                      classImage: "class img",
                      totalLevel: 5
                     },
              approved: false,
            }

            defer.resolve(data);
          }, 200);

          return defer.promise();
        }
      };

      VirtualDojo.reqres.setHandler("entities:feedback:get", function(params) {
        return API.getFeedback(params);
      });

      VirtualDojo.reqres.setHandler("entities:feedback:post", function(params) {
        return API.postFeedback(params);
      });

      VirtualDojo.reqres.setHandler("entities:feedback:getAll", function(params) {
        return API.getUserFeedbacks(params);
      });

    });
  }
);
