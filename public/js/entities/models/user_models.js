define(
  [
    "app",
    "entities/models/discipline_models",
    "entities/models/class_models",
    "entities/models/level_models",
    "entities/models/feedback_models"
  ],
  function(VirtualDojo, DisciplineModels, ClassModels, LevelModels, FeedbackModels) {
    VirtualDojo.module("Entities.Models.Users", function(UserModels, VirtualDojo, Backbone, Marionette, $, _) {
      
      // user model 
      UserModels.User = Backbone.Model.extend({
        default: {
          username: "",
          fullname: "",
          ranks: null  // UserRank[]
        },
        initialize: function() {
          // instantiate Collections and Models from JSON
          if (!this.get("isInstructor")) { // student
            var ranks = this.get("ranks");
            if (ranks) {
              var rankCollection = new UserModels.UserRanks();
              ranks.forEach(function(userRank) {
                rankCollection.add(
                  new UserModels.UserRank(userRank)
                );
              });

              this.set("ranks", rankCollection);
            }
          } else {
            var rank = this.get("rank");
            if (rank) {
              this.set("ranks", new UserModels.UserRank(rank));
            }
          }
        }
      });
      // user rank model 
      UserModels.UserRank = Backbone.Model.extend({
        default: {
          disciplineTitle: "",
          rankNum: 0,
          rankTitle: "",
          rankIcon: "" // Url
        }
      });
      // user ranks collection
      UserModels.UserRanks = Backbone.Collection.extend({
        model: UserModels.UserRank
      });

      // user enrolled model 
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

      // user progress model 
      UserModels.Progress = Backbone.Model.extend({
        default: {
          discipline: null,
          currentClassId: null,
          currentLevelNum: null,
          currentLevel: null, // Fetch & Set by View!!
          percentage: 0 // (%),
        },
        initialize: function() {
          // instantiate Models from JSON

          var discipline = this.get("discipline");
          if (discipline) {
            this.set("discipline", new DisciplineModels.Discipline(discipline));
          }

          var currentLevel = this.get("currentLevel");
          if (currentLevel) {
            this.set("currentLevel", new LevelModels.Level(currentLevel));
          }
        },
        getCurrentClassId: function() {
          return this.get("currentClassId");
        },
        getCurrentLevel: function() {
          return this.get("currentLevel");
        }
      });

      // user progresses collection
      UserModels.Progresses = Backbone.Collection.extend({
        model: UserModels.Progress
      });


      // user feedback model 
      UserModels.UserFeedback = Backbone.Model.extend({
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
