var express = require('express');
var router = express.Router()

function doLogin(req,res){
	next();
}

function doSignup(req,res,next){
	//console.log(req);
	next()
}

//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
