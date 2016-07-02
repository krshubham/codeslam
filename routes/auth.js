var express = require('express');
var router = express.Router()

function getLoginPage(req,res,next){
	res.render('login.hbs');
	next();
}

function doLogin(req,res){
	next();
}

function getSignupPage(req,res,next){
	res.render('signup.hbs');
	next();
}

function doSignup(req,res,next){
	//console.log(req);
	next()
}

//Routes to do the authentication.
router.get('/signup',getSignupPage);
router.post('/signup',doSignup);
router.get('/login',getLoginPage);
router.post('/login',doLogin);


module.exports = router;
