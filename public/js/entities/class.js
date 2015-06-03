define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Classes", function(Classes, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getClasses: function (params) {
          var defer = $.Deferred();

          setTimeout(function(){
            var data = 
            {
              classNum: 1,
              disciplineId: 1,
              instructorId: 1,
              instructorName: "Pranav",
              instructorRank: 5,
              instructorRankTitle: "Master",
              title: "Philosophy of Sword Fighting",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
              classImage: "http://33.media.tumblr.com/avatar_161256d168d5_128.png",
              totalLevel: 5
            };

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

      VirtualDojo.reqres.setHandler("entities:classes:get", function (params) {
        return API.getClasses(params);
      });
    });
  }
);
