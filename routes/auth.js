var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var url = 'mongodb://localhost:27017/slam'
var db = require('./db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var users = null;
var secret = 'g@@k@911';
function validateUserDetails(name,email,password,cp){
	assert.deepEqual(cp,password);
	if(password.length>=6 && password.length<=32 && validate.isEmail(email) && typeof(name) === 'string'){
		return;
	}
	else{
		var err = new Error('Error in Validating the user');
		throw err;
	}
}

function doSignup(req,res,next){argur
	users = db.get().collection('users');
	var name = xss(req.body.signup_name),
	email = xss(req.body.signup_email),
	password = xss(req.body.signup_pwd),
	confirm = xss(req.body.c_pwd);
	try{
		validateUserDetails(name,email,password,confirm);
		bcrypt.hash(password, saltRounds, function(err, hash) {
			assert.equal(err,null);
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
					res.redirect('/');
				}
			});
		});
	}
	catch(err){
		console.log('Hello' + err);
	}
}

function doLogin(req,res,next){
	users = db.get().collection('users');
	var username = req.body.login_email,
	password = req.body.login_pwd;
	users.findOne({email: username},function(err,user){
		assert.equal(err,null);
		if(!user){
			var vm = {
				title: 'Welcome',
				error: true,
				message: "Those details don't match any records"
			}
			res.render('index',vm);
			next();
		}
		else{
			bcrypt.compare(password,user.password, function(err,result) {
				assert.equal(err,null);
				if(!result){
					console.log('Error in validating login details');
				}
				else{
					var item = {
						name: username,
						password: user.password
					}
					//Giving a token to the user for the login.
					var token = jwt.sign(item, secret, {
						expiresIn: 86400
					});
					var vm = {
						token: token,
						title: 'home'
					}
					res.render('home',vm);
				}
			});
		}
	});
}




//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);

module.exports = router;
