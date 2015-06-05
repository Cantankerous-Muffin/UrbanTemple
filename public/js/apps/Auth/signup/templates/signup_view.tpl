<b>
<form class="ui form">
  <h4 class="ui dividing header">Personal Information</h4>
  <div class="two fields">
    <div class="field">
      <label>Name</label>
      <div class="two fields">
        <div class="field">
          <input id="firstname" type="text" name="first-name" placeholder="First Name">
        </div>
        <div class="field">
          <input id="lastname" type="text" name="last-name" placeholder="Last Name">
        </div>
      </div>
    </div>
    <div class="field">
      <label>Instructor Key</label>
      <div class="field">
          <input id="instructorkey" type="text" name="instructor-key" placeholder="Enter Key if Registering as Instructor">
        </div>
    </div>

    <div class="field">
      <label>Email </label>
      <input id="email" type="text" name="user-email" placeholder="Email">
    </div>  

  </div>
  
  
  <h4 class="ui dividing header">Account Info</h4>
  <div class="three fields">
    <div class="required field">
      <label>Username</label>
      <div class="ui icon input">
        <input id="username" type="text" placeholder="Username">
        <i class="user icon"></i>
      </div>
    </div>
    <div class="required field">
      <label>Password</label>
      <div class="ui icon input">
        <input id="password" type="password">
        <i class="lock icon"></i>
      </div>
    </div>
     <div class="required field">
      <label>Confirm Password</label>
      <div class="ui icon input">
        <input type="confirm password">
        <i class="lock icon"></i>
      </div>
    </div>
  </div>
  <div class="ui submit button" id="register_submit">Register</div>
</form>