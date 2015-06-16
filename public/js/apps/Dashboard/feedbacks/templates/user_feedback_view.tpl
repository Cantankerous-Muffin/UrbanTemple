
  <% if (approved) { %>
  <h4><b><i> Approved: </i></b></h4>
      <div class="summary user-feedback"><i class="feed icon"></i>
        You've submitted video for <%= classTitle %> by instructor <b> Jonah Chin </b> </a>.
      </div>
  <% } %>

  <% if (!approved) { %>
   <h4><b><i> Pending: </i></b></h4>
      <div class="summary user-feedback"><i class="feed icon"></i>
        You've submitted video for <%= classTitle %> by instructor <b> Jonah Chin </b> </a>.
      </div>
  <% } %>


  