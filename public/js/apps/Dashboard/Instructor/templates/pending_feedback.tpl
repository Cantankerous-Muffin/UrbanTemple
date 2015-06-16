  <% if (approved) { %>
    <h4><b><i> Approved: </i></b></h4>
    <div class="summary user-feedback"><i class="feed icon"></i>
       You have left feedback to <%= studentUsername %>'s <a><%= classTitle %></a> class video.
    </div>
  <% } %>


  <% if (!approved) { %>
   <h4><b><i> Pending: </i></b></h4>
  <div class="summary user-feedback"><i class="feed icon"></i>
     <%= studentUsername %> is waiting for your feedback  for <a><%= classTitle %></a> class.
  </div>
  <% } %>



