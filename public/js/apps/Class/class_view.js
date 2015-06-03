define([
    "app",
    "tpl!apps/Class/templates/class_layout.tpl",
    "tpl!apps/Class/templates/class_view.tpl",
    "tpl!apps/Class/templates/level_view.tpl"
  ],
  function(VirtualDojo, classlayoutTpl, classViewTpl, levelViewTpl) {
    VirtualDojo.module("ClassApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
      
    
    // TrainingCenter Layout View 

      View.classLayout = Marionette.LayoutView.extend({
        template: classlayoutTpl,
        regions: {
          classRegion: "#class-region",
          levelRegion: "#level-region"
        }
      });
      
      // ClassThumb Itemview
      View.Class = Marionette.ItemView.extend({
        className: "class",
        template: classViewTpl,
        initialize: function() {
        }
      });

      // level Itemview
      View.Level = Marionette.ItemView.extend({
        className: "level",
        template: levelViewTpl,
        initialize: function() {
        }
      });

      // LevelList collection view
      View.LevelList = Marionette.CollectionView.extend({
        childView: View.Level,
        serializeData: function() {
          return {
            // title: this.model.get("title"),
            // description: this.model.get("description")
          } 
        }
      });
    });
    return VirtualDojo.ClassApp.View;
  }
);


