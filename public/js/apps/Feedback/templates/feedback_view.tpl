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
          

          <% if (UTConfig.isInstructor) { %>
            <div class="ui form">
              <div class="field">
                  <h4> Comment: </h4>
                <textarea class="comments"></textarea>
              </div>
            </div>
          <% } %>

          <% if (UTConfig.isInstructor) { %>
          <!-- <div class="approve-video"> -->
            <div class="positive ui button approve-video">Approve</div>
          <!-- </div> -->
          <!-- <div class="disapprove-video"> -->
            <div class="negative ui button disapprove-video">Disapprove</div>
          <!-- </div> -->
          <% } %>

          <% if (UTConfig.isInstructor === false) { %>
            <h4>Instructor Comment:</h4>
            <% if (comment.length > 0) { %>
              <p><%= comment %></p>
            <% } else { %>
              <p> Awaiting instructor comments and approval </p>
            <% } %> 


          <% } %>
        </div>
      </div>
      </div>
  </div>
</div>