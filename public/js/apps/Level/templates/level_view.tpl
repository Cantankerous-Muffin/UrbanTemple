<h1 class="ui block header level-header"><%= title %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= description %></div>

</br></br>
  <% if (!next) { %>
  <form action="/path/to/action" id="new_video" method="POST">
    <input type="hidden" name="panda_video_id"/>
    <div class='progress'><span id="progress-bar" class='bar'></span></div>
    <div id="file-drop">Drop files here</div>
    <div id="browse-files">Choose file</div>
  </form>
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
