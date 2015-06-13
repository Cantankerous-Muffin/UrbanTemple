define([
    "app",
    "entities/models/feedback_models",
    "apps/Feedback/feedback_view"
  ], 
  function(VirtualDojo, FeedbackModels, FeedbackView){
    VirtualDojo.module("FeedbackApp", function(FeedbackApp, VirtualDojo, Backbone, Marionette, $, _){

      FeedbackApp.Controller = {
        showFeedback: function(params){
          var FeedView = null;
          require(["entities/feedback"],function(){
            var fetchFeed = VirtualDojo.request("entities:feedback:get", params)
              fetchFeed
                .done(function(data){
                  if (data) {
                    var feedbackModel = new FeedbackModels.Feedback(data);
                  }
                  FeedView = new FeedbackView.Feedback({model: feedbackModel});
                  VirtualDojo.regions.main.show(FeedView);
                });
          })
        },
        postFeedback: function(params){
          var FeedView = null;
          require(["entities/feedback"],function(){
            var fetchFeed = VirtualDojo.request("entities:feedback:post", params)
              fetchFeed
                .done(function(data){
                 if (data) {
                    var feedbackModel = new FeedbackModels.Feedback(data);
                  }
                  FeedView = new FeedbackView.Feedback({model: feedbackModel});
                  VirtualDojo.navigate("/feedback/" + feedbackModel.get("id"));
                  VirtualDojo.regions.main.show(FeedView);
                });
          })
        },
        approveFeedback: function(params){
          require(["entities/feedback"],function(){
            var approveFeed = VirtualDojo.request("entities:feedback:approve", params)
              approveFeed
                .done(function(data){
                  console.log("approved!");
                  VirtualDojo.trigger("show:dashboard");
                });
          })
        }
      };

    });
    return VirtualDojo.FeedbackApp.Controller
  });