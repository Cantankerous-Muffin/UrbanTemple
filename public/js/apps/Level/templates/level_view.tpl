




<div class="ui center aligned segment">
  <div class="ui items">
    <div class="item">
      <div class="content">
        <h1><%= title %> </h1>
        <iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
          <div class="meta">
            <p><%= description %></p>
          </div>

        <div class="description">

        </div>
      </div>
      </div>
  </div>
</div>



<div class="ui center aligned segment">
    <% if (!next) { %>
    <form action="/path/to/action" id="new_video" method="POST">
      <input type="hidden" name="panda_video_id"/>
      <div class='progress'><span id="progress-bar" class='bar'></span></div>
      <div id="file-drop">Drop files here</div>
      <div id="browse-files">Choose file</div>
    </form>
    <% } %>

  <div class="prev ui button">
    <% if (prev) { %>
      <i class="left arrow icon"></i>
      Previous
    <% } %>
  </div>
  <div class="next ui button">
    <% if (next) { %>
      Next
      <i class="right arrow icon"></i>
    <% } %>
  </div>
</div>
