
<h1><%= title %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= description %></div>
<div class="submitvideo"><%= (next == false) ? 'Submit Field & Button' : '' %></div>
<div class="prev"><%= (prev == true) ? 'Prev Button' : '' %></div>
<div class="next"><%= (next == true) ? 'Next Button' : '' %></div>

