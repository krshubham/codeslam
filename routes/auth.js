var express = require('express');
var router = express.Router()
var mongo = require('../mongo');
var assert = require('assert');
function doLogin(req,res){
	next();
}

function doSignup(req,res,next){
	//console.log(req);
	next()
}

function ifLoggedIn(res,req,next){
	if(req.session.name){
		var coll = mongo.collections('users');
		coll.findOne({username: req.session.name},function(err,db){
			assert.equal(err,null);
			if(user){
				req.user = user;
				res.locals.user = user;
			}
			next();
		});
	}
	else{
		next();
	}
}





//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
