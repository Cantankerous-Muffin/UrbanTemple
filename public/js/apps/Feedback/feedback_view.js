define([
    "app",
    "tpl!apps/Feedback/templates/feedback_view.tpl"
  ], 
  function(VirtualDojo,feedbackViewTpl){

    VirtualDojo.module("FeedbackApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      View.Feedback = Marionette.ItemView.extend({
        template: feedbackViewTpl,

        events: {
          'click .submitfeedback' : 'submitFeedback',
        },

        submitFeedback: function(e) {
          e.preventDefault();
          console.log('submitFeedback clicked');
          
        },

        serializeData: function() {
            //bind model properties to data object properties here
          return {
            //return data object here
            studentUsername: this.model.get("studentUsername"),
            instrUsername: this.model.get("instrUsername"),
            videoUrl: this.model.get("videoUrl"),
            comment: this.model.get("comment"),
          }
        },

        initialize: function() {
        }

      });

    })
    return VirtualDojo.FeedbackApp.View;
  })