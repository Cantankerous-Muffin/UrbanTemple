// define([
//     "app"
  
//   ],
//   function(VirtualDojo) {
  
//     VirtualDojo.module("Utilities", function (Utilities, VirtualDojo, Backbone, Marionette, $, _){
//       Utilities.entryCallback = function() {
//         console.log("AuthCheck: In entry callback", VirtualDojo.authed)
//         // initialize history on start of the app 
//         if(Backbone.history){
//           Backbone.history.start(); 
//           console.log("history started");
    
//           if(VirtualDojo.getCurrentRoute() === ""){
//             console.log("go to dashboard")
//             VirtualDojo.trigger("show:haha");
//           }
//         }
// 	    }
//     });	
//     return VirtualDojo.Utilities.entryCallback;
//   }
// );
