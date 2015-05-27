var VirtualDojo = new Marionette.Application();

VirtualDojo.addRegions({
  "headerRegion": "#header",
  "topMenuRegion": "#top-menu",
  "mainRegion": "#main"
});

VirtualDojo.on('initialize:after', function() {
  return Backbone.history.start();
});

