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
                          next: true 
                        },
                        {
                          levelNum: 2,
                          title: "Hello world2",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: true,
                          next: false, 
                        },
                        {
                          levelNum: 3,
                          title: "Hello world3",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: false,
                          next: false 
                        },
                        {
                          levelNum: 4,
                          title: "Hello world4",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: false,
                          prev: false,
                          next: false 
                        },
                        {
                          levelNum: 5,
                          title: "Hello world5",
                          description: "woolalamuchachapapaya",
                          videoUrl: "https://www.youtube.com/embed/ouR4nn1G9r4",
                          feedbackNeeded: true,
                          prev: false
                        },
                      ];

           // mock result from server

            defer.resolve(data);
          }, 600);

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
        }
      };

      VirtualDojo.reqres.setHandler("entities:levels:getAll", function (params) {
        return API.getLevels(params);
      });
    });
  }
);
