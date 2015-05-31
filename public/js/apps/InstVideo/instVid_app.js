define([
    "app",
    "apps/InstVideo/instVid_controller"
  ],
  function(VirtualDojo, InstVidController) {

    VirtualDojo.module("InstVideo", function(InstVideo, VirtualDojo, Backbone, Marionette, $, _){
      // var route = 'class/'+classNameOrID+'/instVid';

      InstVideo.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "instVid": "showInstVid",
        }
      });
     
       var API = {
        showInstVid: function(){
          console.log('API showIntVid');
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



