// collection view
define([
    "app",
    "tpl!apps/Dashboard/feedbacks/templates/user_feedback_view.tpl",
    "tpl!apps/Dashboard/feedbacks/templates/user_feedbacks_view.tpl"
  ],
  function(VirtualDojo, feedbackViewTpl, feedbacksViewTpl) {
    VirtualDojo.module("DashApp.Feedback.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      // single class item view
      View.UserFeedback = Marionette.ItemView.extend({
        className: "event",
        template: feedbackViewTpl,

        events: {
          "click .user-feedback": "clickFeedback"
        },

        clickFeedback: function(e){
          e.preventDefault();
          var feedbackId = this.model.get("id");

          VirtualDojo.trigger("show:feed", {
            'feedbackId': feedbackId
          })
        },

        serializeData: function() {
          var model = this.model;
          var username = model.get("studentUsername");
          var classTitle = model.get("classTitle");

          return {
            username: username,
            classTitle: classTitle,
          } 
        },

        initialize: function() {
          console.log("feedback model", this.model);
        }
      });

      // my classes collection view
      View.UserFeedbacks = Marionette.CompositeView.extend({
        template: feedbacksViewTpl,
        childView: View.UserFeedback,
        childViewContainer: ".feedbacks-container"
      });
    });

    return VirtualDojo.DashApp.Feedback.View;
  }
);



 