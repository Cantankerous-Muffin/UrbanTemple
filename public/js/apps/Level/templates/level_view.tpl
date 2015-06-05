
<h1 class="ui block header level-header"><%= title %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= description %></div>

</br></br>
  <% if (!next) { %>
    <input type="text" class="submitVideoUrl" placeholder="type youtube url here">
    <button type="submit" class="submitvideBtn">Sign up</button>
  <% } %>

</br></br></br>

<div class="prev ui button">
  <% if (prev) { %>
    <i class="left arrow icon"></i>
    Prev Button
  <% } %>
</div>
<div class="next ui button">
  <% if (next) { %>
    Next Button
    <i class="right arrow icon"></i>
  <% } %>
</div>
