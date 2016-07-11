var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
function doLogin(req, res,next){
	next();
}

function doSignup(req, res, next) {
	var name = xss(req.body.signup_name);
	var email = xss(req.body.signup_email);
	var password = xss(req.body.signup_pwd);
	var confirm_password = xss(req.body.c_pwd);

	console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);
}



//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
