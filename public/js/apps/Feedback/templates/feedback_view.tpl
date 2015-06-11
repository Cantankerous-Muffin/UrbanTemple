<div class="ui segment">
  <div class="ui items">
    <div class="item">
      <div class="content">
        <h1>Feedback For <%= studentUsername %> </h1>
        <iframe width="900" height="450" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
          <div class="meta">

          <br>
          <br>
          <br>


          <div><h2><%= "Instructor: " + instrUsername %></h2></div>
          </div>

          <% if (UTConfig.isInstructor) { %>
            <div class="ui form">
              <div class="field">
                  <h4> Comment: </h4>
                <textarea class="comments"></textarea>
              </div>
            </div>
          <% } %>
          <h4>Good Job Raymond! Overall, your neutral stance is good. For your 3 step strike, try to use your left elbow to yield power to slice. Be mindful that left hand is responsible for power and right hand is only for navigating your sword. Also, for your 1 step strike, use your tan tien (core) to throw your body forward and back. Other than that, you did great! Congratulations for your promotion. </h4>
          <% if (UTConfig.isInstructor) { %>
          <!-- <div class="approve-video"> -->
            <div class="positive ui button">Approve</div>
          <!-- </div> -->
          <!-- <div class="disapprove-video"> -->
            <div class="negative ui button">Disapprove</div>
          <!-- </div> -->
          <% } %>

          <% if (UTConfig.isInstructor === false) { %>
            <h4>Instructor Comment:</h4>
            <p><%= comment %></p>
          <% } %>

          

        
      </div>
      </div>
  </div>
</div>