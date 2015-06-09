<div class="image">
  <div class="thumbnail-container">
    <div class="img-container with-fadeout">
      <img src="<%= classImage %>"></img>
    </div>
    <% if (classVideo) { %>
<!--       <video class="thumbnail-video" poster="" muted>
        <source src="<%= classVideo %>" type="video/mp4">
      </video> -->
    <% } %>
  </div>
</div>
<div class="content">
  <a class="header"><%= title %></a>
  <div class="description">
    <%= description %>
  </div>
</div>
