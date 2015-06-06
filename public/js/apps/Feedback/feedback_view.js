define([
    "app",
    "tpl!apps/Feedback/templates/feedback_view.tpl"
  ], 
  function(VirtualDojo,feedbackViewTpl){

    VirtualDojo.module("FeedbackApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      View.Feedback = Marionette.ItemView.extend({
        template: feedbackViewTpl,

        ui: {
          approveButton: ".approve-video",
          disapproveButton: ".disapprove-video",
          commentBox: ".comments"
        },

        events: {
          'click @ui.approveButton' : 'submitApproval',
          'click @ui.disapproveButton' : 'submitDisapproval',
        },

        submitApproval: function(e) {
          e.preventDefault();
          var requestData = {
            feedbackId: this.model.get("feedbackId"),
            comment: this.ui.commentBox.val(),
            approved: true, 
          }

          VirtualDojo.trigger("entities:feedback:approve", requestData)
        },

  
        submitDisapproval: function(e) {
          e.preventDefault();
          console.log('failed!!');        
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