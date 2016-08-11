var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var url = 'mongodb://localhost:27017/slam'
var db = require('./db');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var users = null;

function validateUserDetails(name,email,password,cp){
	assert.deepEqual(cp,password);
	if(password.length>=6 && password.length<=32 && validate.isEmail(email) && typeof(name) === 'string' ){
		return;
	}
	else{
		var err = new Error('Error in Validating the user');
		throw err;
	}
}

function doSignup(req,res,next){
	users = db.get().collection('users');
	var name = xss(req.body.signup_name),
	email = xss(req.body.signup_email),
	password = xss(req.body.signup_pwd),
	confirm = xss(req.body.c_pwd);
	
	try{
		validateUserDetails(name,email,password,confirm);
		bcrypt.hash(password, saltRounds, function(err, hash) {
			assert.equal(err,null);
			console.log(users);
			users.findOne({email: email},function(err,user){
				assert.equal(err,null);
				if(user){
					var vm = {
						title: 'Welcome',
						success: false,
						message: 'Something Went Wrong. Please Try again'
					};
					console.log('user exist');
				}
				else{
					var user = {
						name: name,
						email: email,
						password: hash
					}
					users.insertOne(user,function(err,done){
						console.log('user inserted');
						assert.equal(err,null);
						console.log(done);
					});
					var vm = {
						title: 'Login',
						message: 'Login now!'
					}
					res.render('index',vm);
				}
			});

		});
	}
	catch(err){
		console.log('Hello' + err);
	}
}


//Routes to do the authentication.
router.post('/signup',doSignup);
//router.post('/login',doLogin);


module.exports = router;
