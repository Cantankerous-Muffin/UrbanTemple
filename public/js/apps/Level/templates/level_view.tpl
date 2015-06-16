<div class="ui center aligned segment">
  <h1 class="level-title"><%= title %></h1>
  <iframe width="960" height="540" src=" <%= videoUrl %>" frameborder="0" allowfullscreen></iframe>
  <div class="ui center align segment">
    <h4 class= "ui header"><%= description %></h4>
  </div>
  <% if (!next) { %>
    <div class="ui action input">
      <input type="text" class="submitVideoUrl" placeholder="submit your video url here">
      <button type="submit" class="ui button submitvideBtn"><i class="upload icon"></i>Submit</button>
    </div>
  <% } %>
</div>

<!-- <form action="/path/to/action" id="new_video" method="POST">
      <input type="hidden" name="panda_video_id"/>
      <div class='progress'><span id="progress-bar" class='bar'></span></div>
      <div id="file-drop">Drop files here</div>
      <div id="browse-files">Choose file</div>
    </form> -->
<!-- 
<div class="ui action input">
  <input type="text" placeholder="Search...">
  <button class="ui button">Search</button>
</div>
 -->

<div class="level-pagination">
  <% if (prev) { %>
    <div class="prev ui button">
    <i class="left arrow icon"></i>
    Previous
  </div>
  <% } %>
  <% if (next) { %>
    <div class="next ui button">
    Next
    <i class="right arrow icon"></i>
  </div>
  <% } %>
</div>