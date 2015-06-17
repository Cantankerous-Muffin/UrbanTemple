define(
  [
    "app",
    "entities/models/class_models",
  ],
  function(VirtualDojo, ClassModels) {
    VirtualDojo.module("Entities.Models.Feedbacks", function(FeedbackModels, VirtualDojo, Backbone, Marionette, $, _) {
      
      // Feedback model 
      FeedbackModels.Feedback = Backbone.Model.extend({
        default: {
          feedbackId: null,
          studentUsername: "",
          instrUsername: "",
          videoUrl: "",
          class: null,
          comment: "",
          approved: null
        },
        initialize: function() {
          var cls = this.get("class");
          if (cls) {
            this.set("class", new ClassModels.Class(cls));
          }
        }
      });
      
      // Feedbacks collection
      FeedbackModels.Feedbacks = Backbone.Collection.extend({
        model: FeedbackModels.Feedback
      });
    });
    return VirtualDojo.Entities.Models.Feedbacks;
  }
);
