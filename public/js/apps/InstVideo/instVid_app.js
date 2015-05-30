define([
    "app",
    "apps/instVid/instVid_controller.js"
  ],
  function(VirtualDojo, InstVidController) {

    VirtualDojo.module("InstVideo", function(InstVideo, VirtualDojo, Backbone, Marionette, $, _){
      InstVideo.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "instVid": "showInstVid",
        }
      });
     
       var API = {
        showInstVid: function(){
          InstVidController.showInstVid();
        }
      };
      
      InstVideo.on("start", function(){
        new InstVideo.Router({
          controller: API
        });
      });
    });

    return VirtualDojo.InstVideo;
  }
);



