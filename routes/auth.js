var express = require('express');
var router = express.Router();
var assert = require('assert');
function doLogin(req, res,next){
	next();
}

function doSignup(req, res, next) {
	var name = req.body.signup_name;
	var email = req.body.signup_email;
	var password = req.body.signup_password;
	var confirm_password = req.body.c_pwd;
	console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);
}



//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
