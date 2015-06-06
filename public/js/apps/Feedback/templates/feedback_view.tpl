<h1 class="ui block header level-header"><%= studentUsername %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= "Instructor: " + instrUsername %></div>


  
    <input type="text" class="submitVideoUrl" placeholder="type youtube url here">
    <button type="submit" class="submitvideBtn">Submit</button>
  

<% if (UTConfig.isInstructor) { %>
  <div class="ui form">
    <div class="field">
      <label>Instructor Feedback</label>
      <textarea></textarea>
    </div>
  </div>
<% } %>

<p><%= comment %></p>


