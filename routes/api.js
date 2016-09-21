var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var db = require('./db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var secret = 'g@@k@911';
var fs = require('fs');
var cuid = require('cuid');
var exec = require('exec');

//The login handler for the api
router.post('/login',function(req,res,next){
	//checking if the code is executing or not
	console.log('received the request for login');

	//getting all the data from the users collection
	users = db.get().collection('users');

	//preventing the xss vulnerable characters from entering the db.
	var email = xss(req.body.email);
	var password = xss(req.body.password);
	var person = {
		email: email,
		verified: true
	}

	//Finding the user from the db.
	users.findOne(person,function(err,user){
		try{
			//check if there is no error
			assert.equal(err,null);
			//check if the user is found
			console.log(user);
			if(!user){
				//user not found
				return res.json({
					success: false,
					message: 'Something is wrong Please try again.'
				});
			}
			else{
				//user is found
				//Now we compare the password of the user
				bcrypt.compare(password,user.password,function(err,result){
					assert.equal(err,null);
					if(!result){
						//Result is not there, assword wrong
						console.log('Error in password');
						//send 401 status code saying Unauthorized
						return res.json({
							success: false,
							message: 'Something is wrong! Please try again.'
						});	
					}
					else{
						//everything is fine,
						//Give the token to the user.
						var item = {
							_id: user._id,
							email: user.email,
							name: user.name,							 
						};
						//sign the token to the user
						var token = jwt.sign(item,secret,{
							expiresIn: 86400
						});
						//send the correct response to the user
						return res.json({
							success: true,
							token: token
						});
					}
				});
			}
		}
		catch(err){
			//catch all the errors and set success flag to false
			//send a forbidden status code
			res.status(403).json({
				success: false,
				error: err
			});
		}
	});
});

function Signup(req,res,next){
	console.log('Signup request received');
	users = db.get().collection('users');
	var name = xss(req.body.name),
	email = xss(req.body.email),
	password = xss(req.body.password),
	confirm_password = xss(req.body.cp);
	try{
		//if js is not enabled, verify here.
		assert.deepEqual(password,confirm_password);
		//make sure that the user does not exist already,
		var user = {
			email: email
		}
		users.findOne(user,function(err,user){
			assert.equal(err,null);
			console.log('checking the user');
			if(user){//the user exists already
				return res.json({
					success: false,
					message: 'User already exists'
				});
			}
			else{
				bcrypt.hash(password,saltRounds,function(err,hash){
					var user = {
						name: name,
						email: email,
						password: hash,
						verified: false,
					};
					users.insertOne(user,function(err,done){
						assert.equal(err,null);
						console.log('user inserted');
						return res.json({
							success: true,
							message: 'user successfully created'
						});
					});
				});		
			}
		});
	}
	catch(err){
		console.log(err.message);
	}
}


function CppWithoutInputs(req,res,next){
	var code = req.body.code,
		lang = req.body.lang;
		//console.log(code);
		var path = './temp/';
		var filename = cuid.slug();
		//console.log(filename);
	//res.send('The language used was: '+ lang +' and the code is: '+code);
	fs.writeFile(path + filename + '.cpp',code,function(err){
		assert.equal(err,null);
		//console.log('file made with the name '+ filename);
		var command = 'g++ '+ path + filename + '.cpp -o ' + path + filename;
		console.log(command);
		exec(command,function(err,stdout,stderr){
			console.log(stderr);
			console.log(err);
			//assert.equal(err,null);
			//assert.equal(stderr,null);
			exec(path+filename,function(a,b,c){
				//console.log(a);
				res.send(b);
				//console.log(c);
			});
		});	
	});
}


 
router.post('/signup',Signup);
router.post('/code',CppWithoutInputs);

module.exports = router;