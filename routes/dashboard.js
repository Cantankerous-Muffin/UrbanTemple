var express = require('express');
var router = express.Router();
var qs = require('querystring');
var request = require('request');
var path = require('path');
var passport     = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user){
		res.sendFile(path.join(__dirname,'../public/dashboard.html'));
	}
	else {
		res.redirect('auth/login');
	}
});

module.exports = router;
