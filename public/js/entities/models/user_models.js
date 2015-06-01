define(
  [
    "app",
    //"entities/models/discipline_models.js",
    //"entities/models/class_models.js",
    //"entities/models/feedback_models.js"
  ],
  function(VirtualDojo, DisciplineModels, ClassModels, FeedbackModels) {
    VirtualDojo.module("Entities.Models.Users", function(UserModels, VirtualDojo, Backbone, Marionette, $, _) {
      UserModels.User = Backbone.Model.extend({
        default: {
          username: "",
          fullname: "",
          ranks: null  // UserRank[]
        },
        initialize: function() {
          // instantiate Collections and Models from JSON
          var ranks = this.get("ranks");
          if (ranks) {
            var rankCollection = new UserModels.UserRank();
            ranks.forEach(function(userRank) {
              rankCollection.add(
                new UserModels.UserRanks(userRank)
              );
            });

            this.set("ranks", rankCollection);
          }
        }
      });

      UserModels.UserRank = Backbone.Model.extend({
        default: {
          discipline: null,
          rankNum: 0,
          rankTitle: "",
          rankIcon: "" // Url
        },
        initialize: function() {
          // instantiate Models from JSON

          var discipline = this.get("discipline");
          if (discipline) {
            this.set("discipline", new DisciplineModels.Discipline(discipline));
          }
        }
      });

      UserModels.UserRanks = Backbone.Collection.extend({
        model: UserModels.UserRank
      });

      UserModels.UserEnrolled = Backbone.Model.extend({
        default: {
          disciplines: null
        },
        initialize: function() {
          // instantiate Collections and Models from JSON
          var disciplines = this.get("disciplines");
          if (disciplines) {
            var disciplineCollection = new DisciplineModels.Disciplines();
            disciplines.forEach(function(discipline) {
              disciplineCollection.add(
                new DisciplineModels.Discipline(discipline)
              );
            });

            this.set("disciplines", disciplineCollection);
          }
        }
      });

      UserModels.Progress = Backbone.Model.extend({
        default: {
          discipline: null,
          currentClass: null,
          percentage: 0 // (%)
        },
        initialize: function() {
          // instantiate Models from JSON

          var discipline = this.get("discipline");
          if (discipline) {
            this.set("discipline", new DisciplineModels.Discipline(discipline));
          }

          var cls = this.get("class");
          if (cls) {
            this.set("class", new ClassModels.Class(cls));
          }
        }
      });

      UserModels.Progresses = Backbone.Collection.extend({
        model: UserModels.Progress
      });

      UserModels.UserFeedbacks = Backbone.Model.extend({
        default: {
          username: "",
          feedbacks: null
        },
        initialize: function() {
          // instantiate Collections and Models from JSON

          var feedbacks = this.get("feedbacks");
          if (feedbacks) {
            var feedbackCollection = new FeedbackModels.Feedbacks();
            feedbacks.forEach(function(feedback) {
              feedbackCollection.add(
                new FeedbackModels.Feedback(feedback)
              );
            });

            this.set("feedbacks", feedbackCollection);
          }
        }
      });

    });

    return VirtualDojo.Entities.Models.Users;
  }
);
