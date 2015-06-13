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
          var comment = this.model.get("comment");  
          if (comment === null) {
            comment = "";
          }
            //bind model properties to data object properties here
          return {
            //return data object here
            studentUsername: this.model.get("studentUserName"),
            instrUsername: this.model.get("instructorUserName"),
            videoUrl: this.model.get("videoURL"),
            comment: comment,
          }
        },

        initialize: function() {
        }

      });

    })
    return VirtualDojo.FeedbackApp.View;
  })