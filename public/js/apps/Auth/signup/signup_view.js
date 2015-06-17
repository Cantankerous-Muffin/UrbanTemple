define([
    "app",
    "tpl!apps/Auth/signup/templates/signup_view.tpl"
  ],
  function(VirtualDojo, signupViewTpl) {
    VirtualDojo.module("AuthApp.Signup.View", function(SignupView, VirtualDojo, Backbone, Marionette, $, _){

      SignupView.view = Marionette.ItemView.extend({
        
        template: signupViewTpl, 

        ui: {
          inputUsername: "input#username",
          inputPassword: "input#password",
          inputFirstName: "input#firstname",
          inputLastName: "input#lastname",
          inputEmail: "input#email",
          inputInstructorKey: "input#instructorkey",
          signupButton: "div#register_submit",
          backButton: "div#back_to_login"
        },

        events: {
          "click @ui.backButton": "backToLogin",
          "click @ui.signupButton": "signup"
        },

        backToLogin: function(event) {
          console.log('backtologin fired')
          event.preventDefault();
           VirtualDojo.trigger("auth:login:show");
        },

        signup: function(event) {
          console.log('submit CLICKED')
          event.preventDefault();
          var username = this.ui.inputUsername.val();
          if (!username) return;
          var password = this.ui.inputPassword.val();
          if (!password) return;
          var firstname = this.ui.inputFirstName.val();
          if (!firstname) return;
          var lastname = this.ui.inputLastName.val();
          if (!lastname) return;
          var email = this.ui.inputEmail.val();
          if (!email) return;
          var instructorKey = this.ui.inputInstructorKey.val();

          var whenDone = this.whenDone;

          var isInstructor = false;
          if (instructorKey) {
            isInstructor = true;
          } else {
            instructorKey = null;
          }

          VirtualDojo.trigger('authenticate:signup', {
            username: username, 
            password: password,
            firstname: firstname,
            lastname: lastname, 
            email: email,
            isInstructor: isInstructor,
            PermissionKey: instructorKey,
            whenDone: whenDone
          }); 
        },

        whenDone: function() {
          console.log("[done] sign up");
          VirtualDojo.trigger("authenticate:init");
        },
      });
    });
    
    return VirtualDojo.AuthApp.Signup.View
  }
);
