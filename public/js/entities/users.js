define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Users", function(Users, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getUser: function (params) {
          var defer = $.Deferred();

          setTimeout(function(){
            var data = {
              username: "ken",
              fullname: "Ken Kang",
              // ranks: null,
              ranks: [{
                discipline: {
                  disciplineId: 1,
                  title: "Kendo",
                  classes: [
                    disciplineId: 1,
                    classId: 5,
                    instructor: User(Instructor),
                    title: "Kendo 105: Head Strike",
                    description: "learn the technique of head strike"
                  ]
                },
                rankNum: 5,
                rankTitle: "5th Keup",
                rankIcon: ""
              }]
            }; // mock result from server

            defer.resolve(data);
          }, 1200);

          return defer.promise();

          //var ajax = Ajax.perform({
          //  type: "GET",
          //  url: '/user/' + params.username,
          //  callback: function (data) {
          //    return data;
          //  }
          //});
          //
          //return ajax.promise();
        }
      };

      VirtualDojo.reqres.setHandler("entities:users:get", function (params) {
        return API.getUser(params);
      });
    });
  }
);
