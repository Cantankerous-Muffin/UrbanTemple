define([
    "app",
    "apps/Class/class_app",
    "tpl!apps/TrainingCenter/templates/training_layout.tpl",
    "tpl!apps/TrainingCenter/templates/class_thumb_view.tpl",
    "tpl!apps/TrainingCenter/templates/class_list_view.tpl"
  ],
  function(VirtualDojo, ClassApp, traininglayoutTpl, classThumbViewTpl, classListViewTpl) {
    VirtualDojo.module("TrainingApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
      
    
    // TrainingCenter Layout View 

      View.TrainingLayout = Marionette.LayoutView.extend({
        template: traininglayoutTpl,
        regions: {
          kendoRegion: "#kendo-region",
          qigongRegion: "#qigong-region"
        },
        initialize: function() {
          console.log("init", this)
        }
      });
      
      // ClassThumb Itemview
      View.ClassThumb = Marionette.ItemView.extend({

        className: "class-thumb",
        template: classThumbViewTpl,

        ui: {
          thumbClick: ".class-wrapper"
        },

        events: {
          "click @ui.thumbClick": "onThumbClick"
        },
        
        onThumbClick: function(event) {
          event.preventDefault();
           var disciplineId = this.model.get("disciplineId");
           var classNum = this.model.get("classNum");

            VirtualDojo.trigger("show:class", {
              disciplineId: disciplineId,
              classNum: classNum
            });
        },

        initialize: function() {
        }
      });

      // ClassList composite view
      View.ClassList = Marionette.CompositeView.extend({
        template: classListViewTpl,
        childView: View.ClassThumb,
        childViewContainer: ".training-container",

        serializeData: function() {
          return {
            title: this.model.get("title"),
            description: this.model.get("description")
          } 
        }
      });
    });
    return VirtualDojo.TrainingApp.View;
  }
);



