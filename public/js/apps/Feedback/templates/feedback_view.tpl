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
            <div class="positive ui button">Approve</div>
            <div class="negative ui button">Disapprove</div>
          <% } %>

          <% if (UTConfig.isInstructor === false) { %>
            <h4>Instructor Comment:</h4>
            <p><%= comment %></p>
          <% } %>
        </div>
      </div>
      </div>
  </div>
</div>