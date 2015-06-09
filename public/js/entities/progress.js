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
                            description: "hello world",
                            disciplineLogo: "",
                            totalClass: 6                
                          },  
                          currentClassNum: 2,
                          currentLevelNum: 4,
                          currentLevelTitle: "12 directional steps",
                          percentage: 34
                        },
                        {
                          discipline: {
                            disciplineId: 2,
                            title: "Qigong",
                            description: "hello world",
                            disciplineLogo: "",
                            totalClass: 6                
                          },  
                          currentClassNum: 4,
                          currentLevelNum: 1,
                          currentLevelTitle: "watermill stance",
                          percentage: 68
                        }
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
