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
              isInstructor: false,
              username: "ken",
              fullname: "Ken Kang",
              // ranks: null,
              ranks: [{
              disciplineTitle: "Kendo",
              rankNum: 5,
              rankTitle: "Beginner",
              rankIcon: null,
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
