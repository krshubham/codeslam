var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb');


function insertuser(name,username,password){
	
}




//function for getting a person logged in
function doLogin(req, res,next){
	var username = xss(req.body.login_email);
	var password = xss(req.body.login_pwd);
	//this method calls another method which further check if the user is available in the db.

	/*console.log(username);
	console.log(password);*/
}

function doSignup(req, res) {
	var name = xss(req.body.signup_name);
	var username = xss(req.body.signup_email);
	var password = xss(req.body.signup_pwd);
	var confirm_password = xss(req.body.c_pwd);
	try{
		assert.deepEqual(password,confirm_password);
		insertUser(name,username,passsword);
	}
	catch(e){
		console.log('Something went wrong');
		// The local variables in the error view model for wrong signup
		var vm_err = {
			error: true,
			name : req.body.signup_name,
			username: req.body.signup_email
		}
		res.render('index',vm_err);
	}
	/*console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);*/
}



//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
