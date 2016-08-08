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
		var userCollection = db.get().collection('users');
		userCollection.findOne({
			username: username
		},function(err,item){
			try{
				assert.equal(err,null);
				assert.equal(item,null);
				console.log('yayy, your email id is unique');
			//Hash the password before inserting.
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
					assert.equal(err,null);
					user = {
						username: username,
						name: name,
						password: hash
					};
					userCollection.insertOne(user,function(err,ok){
						assert.equal(err,null);
						console.log('Document inserted into the db');
					});
				});
			});
			res.send('successful');
		}
		catch(err){
			console.log(err);
			return res.send('FUck you');
		}
		res.send('doc inserted');
	});
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
}
/* //END OF THE SIGNUP FUNCTION */




//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
