define(
  [
    "app",
    "entities/ajax"
  ], function(VirtualDojo, Ajax) {
    VirtualDojo.module("Entities.Classes", function(Classes, ExaApp, Backbone, Marionette, $, _) {
      var API = {
        getClasses: function (params) {

          // var url = "/discipline/" + params.disciplineId + "/class/" + params.classNum;
          // console.log("urltestsetts", url);
          
          var defer = $.Deferred();

          setTimeout(function(){
            var data = 
            {
              levelNum: 3,
              title: "Advanced Sword Grip",
              description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
              videoUrl: "https://www.youtube.com/embed/erRk8mBgF0A",
              feedbackNeeded: false,
              prev: true,
              next: true
            };
           // mock result from server - Route: /discipline/<discipline_id>/class/<class_num>/level/<level_num>

            defer.resolve(data);
          }, 200);

          return defer.promise();

          //var ajax = Ajax.perform({
          //  type: "GET",
          //  url: '/discipline/ + params.disciplineID + /class/ + params.classNum
              // eg. /discipline/1/class/1
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
