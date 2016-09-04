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
var users = null;
var secret = 'g@@k@911';



//The login handler for the api
router.post('/login',function(req,res,next){
	//checking if the code is executing or not
	console.log('received the request for login');

	//getting all the data from the users collection
	users = db.get().collection('users');

	//prevebting the xss vulnerable characters from entering the db.
	var email = xss(req.body.email);
	var password = xss(req.body.password);
	var person = {
		email: email
	}

	//Finding the user from the db.
	users.findOne(person,function(err,user){
		try{
			//check if there is no error
			assert.equal(err,null);
			if(!user){
				//user not found
				res.status(401).json({
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
						res.status(401).json({
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
						s//sign the token to the user
						var token = jwt.sign(item,secret,{
							expiresIn: 86400
						});
						//send the correct response to the user
						res.json({
							success: true,
							token: token
						});
					}
				});
			}
		}
		catch(err){
			//catch all the errors and set success flasg to false
			//send a forbidden status code
			res.status(403).json({
				success: false,
				error: err
			});
		}
	});
});

module.exports = router;