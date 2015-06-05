define([
    "app",
    "apps/Feedback/feedback_controller"
  ], 
  function(VirtualDojo, FeedbackController) {

    VirtualDojo.module("FeedbackApp", function(FeedbackApp, VirtualDojo, Backbone, Marionette, $, _) {

      FeedbackApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "feedback/:feedbackId": "showFeedback"
        }
      });

      FeedbackApp.generateFeedbackUrl = function(feedbackId) {
        var url = "feedback/" + feedbackId;
        // console.log("url xxxxxxx", url);
        return url;
      };

      var API = {
        showFeedback: function(params){
          console.log("api.showFeedback");
          FeedbackController.showFeedback(params);
        },
        postFeedback: function(params){
          console.log("api.postFeedback");
          FeedbackController.postFeedback(params);
        }
      };

      VirtualDojo.on("show:feed", function(params){
        console.log('Show:feed executed from level_app');
        VirtualDojo.navigate(FeedbackApp.generateFeedbackUrl(params.feedbackId));
        API.showFeedback(params);
      });

      VirtualDojo.on("entities:feedback:post", function(params){
        API.postFeedback(params);
      });

      FeedbackApp.on("start", function(){
        new FeedbackApp.Router({
          controller: API
        });
      });

    });
    return VirtualDojo.FeedbackApp 
  }
);