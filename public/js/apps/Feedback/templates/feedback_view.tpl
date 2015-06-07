





<div class="ui center aligned segment">
  <div class="ui items">
    <div class="item">
      <div class="content">
        <h1>Feedback For <%= studentUsername %> </h1>
        <iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
          <div class="meta">
          <div><%= "Instructor: " + instrUsername %></div>
          </div>

       
          <% if (UTConfig.isInstructor) { %>
            <div class="ui form">
              <div class="field">
                  <h4> Comment: </h4>
                <textarea class="comments"></textarea>
              </div>
            </div>
          <% } %>
          <% if (UTConfig.isInstructor) { %>
          <div class="approve-video">
            <div class="positive ui button">Approve</div>
          </div>
          <div class="disapprove-video">
            <div class="negative ui button">Disapprove</div>
          </div>
          <% } %>

          <% if (UTConfig.isInstructor === false) { %>
            <h4>Instructor Comment:</h4>
            <p><%= comment %></p>
          <% } %>

          

        
      </div>
      </div>
  </div>
</div>