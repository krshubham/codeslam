var express = require('express');
var router = express.Router();
var assert = require('assert');
function doLogin(req, res,next){
	next();
}

function doSignup(req, res, next) {
	console.log(req.body.signup_name);
}



//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
