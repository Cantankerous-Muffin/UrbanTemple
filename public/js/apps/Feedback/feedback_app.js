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
        },
        approveFeedback: function(params){
          console.log("api.approveFeedback");
          FeedbackController.approveFeedback(params);
        }
      };

      VirtualDojo.on("show:feed", function(params){
        VirtualDojo.navigate(FeedbackApp.generateFeedbackUrl(params.feedbackId));
        API.showFeedback(params);
      });

      VirtualDojo.on("entities:feedback:post", function(params){
        API.postFeedback(params);
      });

      VirtualDojo.on("entities:feedback:approve", function(params){
        API.approveFeedback(params);
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