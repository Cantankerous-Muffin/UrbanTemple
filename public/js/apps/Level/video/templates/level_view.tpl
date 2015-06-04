
<h1><%= title %></h1>
<iframe width="560" height="315" src=<%= videoUrl %> frameborder="0" allowfullscreen></iframe>
<div><%= description %></div>
<div><%= (next == false) ? 'Submit Field & Button' : '' %></div>
<div><%= (prev == true) ? 'Prev Button' : '' %></div>
<div><%= (next == true) ? 'Next Button' : '' %></div>

