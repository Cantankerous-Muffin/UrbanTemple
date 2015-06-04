define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Levels", function(Levels, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getLevels: function (params) {
          var defer = $.Deferred();

          setTimeout(function(){
            var data = [
                        {
                          levelNum: 1,
                          title: "Hello world1",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: false,
                          next: true
                        },
                        {
                          levelNum: 2,
                          title: "Hello world2",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: true,
                          next: true, 
                        },
                        {
                          levelNum: 3,
                          title: "Hello world3",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: true,
                          next: true 
                        },
                        {
                          levelNum: 4,
                          title: "Hello world4",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: true,
                          next: true 
                        },
                        {
                          levelNum: 5,
                          title: "Hello world5",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: true,
                          prev: true,
                          next: false
                        },
                      ];

           // mock result from server

            defer.resolve(data);
          }, 200);

          return defer.promise();

          //var ajax = Ajax.perform({
          //  type: "GET",
          //  url: '/discipline,
          //  callback: function (data) {
          //    return data;
          //  }
          //});
          //
          //return ajax.promise();
        },

        getLevel: function(params) {
          var defer = $.Deferred();
          //from route: /discipline/<discipline_id>/class/<class_num>/level/<level_num>

          setTimeout(function(){
            var data = {
              levelNum: 4,
              title: 'Advanced Sword Grip',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
              videoUrl: 'https://www.youtube.com/embed/NCQpzHPYRUc',
              feedbackNeeded: false,
              prev: true,
              next: false
            }

            defer.resolve(data);
          }, 200);
          return defer.promise();
        }
      };

      VirtualDojo.reqres.setHandler("entities:levels:getAll", function (params) {
        return API.getLevels(params);
      });

      VirtualDojo.reqres.setHandler("entities:level:get", function(params) {
        console.log('Returning entities:level:get')
        return API.getLevel(params);
      });
    });
  }
);
