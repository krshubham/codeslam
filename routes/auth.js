var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var bcrypt = require('bcrypt-nodejs');
var url = 'mongodb://localhost:27017/slam'
var db = require('./db');



//function for inserting the user data into the db.
function insertUser(n,e,p){	
	userCollection.findOne({
		username: e
	},function(err,item){
		try{
			assert.equal(err,null);
			assert.equal(item,null);
			console.log('yayy, your email id is unique');
			//Hash the password before inserting.
			user = {
				username: e,
				name: n,
				password: p
			};
			userCollection.insertOne(user,function(err,ok){
				assert.equal(err,null);
				console.log('Document inserted into the db');
			});
		}
		catch(err){
			console.log('email is already in use');
			return;
		}
	});

}

//Things to validate before inserting the data:
function validateUser(name,email,password){
	//The json object for any error in the function known as user_exists_err;

	user_exists_err = {
		error: 'true',
		message: 'Email already in use'
	}

	if(name.length>0 && username.length>0 && password.length>=6 && password.length<=32){
		try{
			insertUser(name,email,password);
		}
		catch(e){
			return;
		}
	}
	else{
		console.log('The error is here');
		throw e;
	}
}

function insertuser(name,username,password){
	//Call a function which validates the user data.
	validateUser(name,username,password)
	//Define this method above.
}

//function for getting a person logged in
function doLogin(req, res,next){
	var username = xss(req.body.login_email);
	var password = xss(req.body.login_pwd);
	//this method calls another method which further check if the user is available in the db.


	console.log(username);
	console.log(password);
}

//The below method handles all the the post requests for signup.
function doSignup(req, res) {
	var name = xss(req.body.signup_name);
	var username = xss(req.body.signup_email);
	var password = xss(req.body.signup_pwd);
	var confirm_password = xss(req.body.c_pwd);
	try{
		assert.deepEqual(password,confirm_password);
		insertUser(name,username,password);
		var vm_successful = {
			authSuccess: true,
			message: 'Your account created successfully,please login.'
		}
		return res.render('index',vm_successful)
	}
	catch(e){
		console.log(e);
		console.log('Something went wrong');
		// The local variables in the error view model for wrong signup
		var vm_err = {
			error: true,
			name : req.body.signup_name,
			username: req.body.signup_email,
			message: 'Something went wrong. Please Try again'
		}
		return res.render('index',vm_err);
	}
	/*console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);*/
}
/* //END OF THE SIGNUP FUNCTION */






//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
