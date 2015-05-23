Client Login/SIGNUP
---
Login
POST
Data-type: JSON Object: {username: '', password:''}

Signup
POST
Data-type: JSON Object: {username: '', password:'', 'isStudent': Boolean}
---

Server
---
Login
isUserValid:
	YES: Redirect to /dashboard. Data-type: Token/Session: JSON Object: {}
	
	NO: Redirect to /login

Signup
isUserNameTaken:
	YES: Redirect to /signup

	NO: PUT user JSON Object in DB, redirect to /dashboard with token/session JSON Object

---
Client Dashboard
---
Dashboard
GET: Data-type: JSON Object

Server Dashboard
---
Response: Data-type: JSON Object
{profile data, progress within course, {url to videos: '', feedback:Boolean} }
---

Training Centre Client
---

