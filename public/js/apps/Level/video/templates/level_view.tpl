
<h1><%= title %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= description %></div>
<div class="submitvideo"><%= (next == false) ? '<form class="form-horizontal"><div class="control-group"><div class="controls"><input type="text" id="submitVideoUrl" placeholder="Youtube embed link here"></div></div><div class="control-group"><div class="controls"><button type="submit" class="btn" id="submitVideoButton">Submit Video</button></div></div></form>' : '' %></div>
<div class="prev"><%= (prev == true) ? 'Prev Button' : '' %></div>
<div class="next"><%= (next == true) ? 'Next Button' : '' %></div>

