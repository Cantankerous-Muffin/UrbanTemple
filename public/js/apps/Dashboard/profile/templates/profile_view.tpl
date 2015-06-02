<h1>Welcome <%= fullname %></h1>
<h2>Your Rank: 
	<% for (var rank in ranks) { %>
		<div><%= ranks[rank][rankNum] %></div>
	<% } %>
</h2>
