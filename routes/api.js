var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var assert = require('assert');
var xss = require('xss');
var mongodb = require('mongodb');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var db = require('./db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var cuid = require('cuid');
var secret = 'g@@k@911';
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://codeslamvitc%40gmail.com:admin@911@smtp.gmail.com');

//The login handler for the api
router.post('/login', function (req, res) {
	//checking if the code is executing or not
	console.log('received the request for login');

	//getting all the data from the users collection
	users = db.get().collection('users');

	//preventing the xss vulnerable characters from entering the db.
	var email = xss(req.body.email);
	var password = xss(req.body.password);
	if (!validate.isEmail(email)) {
		console.log('not email');
		return res.json({
			success: false,
			message: 'Email not in correct format'
		});
	}
	var person = {
		email: email
	};
	//Finding the user from the db.

	users.findOne(person, function (err, user) {
		try {
			//check if there is no error
			assert.equal(err, null);
			//check if the user is found
			console.log(user);
			if (!user) {
				//user not found
				return res.json({
					success: false,
					message: 'Something is wrong!, please try again.'
				});
			}
			else {
				//user is found
				//Now we compare the password of the user
				bcrypt.compare(password, user.password, function (err, result) {
					assert.equal(err, null);
					if (!result) {
						//Result is not there, password wrong
						console.log('Error in password');
						//send 401 status code saying Unauthorized
						return res.json({
							success: false,
							message: 'Something is wrong! Please try again.'
						});
					}
					else {
						//everything is fine,
						//Give the token to the user.
						var item = {
							_id: user._id,
							email: user.email,
							name: user.name,
							username: user.username
						};
						//sign the token to the user
						var token = jwt.sign(item, secret, {
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
		catch (err) {
			//catch all the errors and set success flag to false
			//send a forbidden status code
			res.status(403).json({
				success: false,
				error: err
			});
		}
	});
});
//The signup function
function Signup(req, res, next) {
	console.log('Signup request received');
	users = db.get().collection('tempUsers');
	var name = xss(req.body.name),
		email = xss(req.body.email),
		username = xss(req.body.username);
	password = xss(req.body.password),
		confirm_password = xss(req.body.cp);
	if (!validate.isEmail(email)) {
		return res.json({
			success: false,
			message: 'Email not in correct format'
		})
	}
	try {
		//if js is not enabled, verify here.
		assert.deepEqual(password, confirm_password);
		//make sure that the user does not exist already,
		var user = {
			email: email
		}
		users.findOne(user, function (err, user) {
			assert.equal(err, null);
			//console.log(user);
			if (user) {//the user exists already
				return res.json({
					success: false,
					message: 'User already exists'
				});
			}
			else {
				link = cuid();
				var mailOptions = {
					from: '"CodeslamAdmin" <admin@codeslam.com>', // sender address
					to: email, // list of receivers
					subject: 'Confirm your Email', // Subject line
					text: 'Hey there, We recently got a login request for this email. Click on the link below to' +
					'verify',
					html: '<a href="http://35.154.28.17/verify/' + link + '">Click Here</a>' // html body
				};
				//console.log(mailOptions.html);
				bcrypt.hash(password, saltRounds, function (err, hash) {
					var user = {
						name: name,
						username: username,
						email: email,
						password: hash,
						v_link: link
					};
					users.insertOne(user, function (err, done) {
						assert.equal(err, null);
						//console.log('user inserted');
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								console.log(error);
								return res.redirect('/error')
								//return console.log(error);
							}
							//console.log('Message sent: ' + info.response);
							return res.json({
								success: true,
								message: 'user successfully created'
							});
						});
					});
				});
			}
		});
	}
	catch (err) {
		console.log(err);
		console.log(err.message);
		res.redirect('/error');
	}
}


router.post('/check', function (req, res) {
	var uname = req.body.username;
	console.log(uname);
	var users = db.get().collection('users');
	var user = {
		username: uname
	}
	users.findOne(user, function (err, person) {
		assert.equal(err, null);
		console.log(person);
		if (!person) {
			res.json({
				success: true
			});
		}
		else {
			res.json({
				success: false
			});
		}
	});
});

router.get('/challenges', function (req, res) {
	const questions = db.get().collection('questions');
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	var person;
	if (token) {
		try {
			//using the synchronous version
			person = jwt.verify(token, secret);
		} catch (err) {
			return res.redirect('/error');   // err
		}
	}
	else {
		// if there is no token
		// return an error; Forbidden you are my friend!
		return res.status(403).json({
			success: false,
			message: 'No token provided.'
		});
	}
	try {
		questions.find({}).toArray(function (err, docs) {
			assert.equal(err, null)
			return res.json({
				questions: docs
			});
		});
	}
	catch (err) {
		console.log(err);
		res.redirect('/error');
	}
});

router.get('/challenge/:id', function (req, res) {
	var id = req.params.id;
	const questions = db.get().collection('questions');
	questions.findOne({ _id: new mongodb.ObjectID(id) }, function (err, doc) {
		assert.equal(err, null);
		console.log(doc);
		res.json({
			question: doc
		});
	});
});

router.post('/submit/:id', function (req, res) {
	console.log('here');
	var id = req.params.id;
	const questions = db.get().collection('questions');
	console.log(req.body);
	var data = req.body.data;
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	var person;
	if (token) {
		try {
			//using the synchronous version
			person = jwt.verify(token, secret);
		} catch (err) {
			return res.redirect('/error');   // err
		}
	}
	else {
		// if there is no token
		// return an error; Forbidden you are my friend!
		return res.status(403).json({
			success: false,
			message: 'No token provided.'
		});
	}
	console.log(person);
	console.log('\n');
	var solver = {
		email: person.email,
		name: person.name,
		username: person.username,
		code: req.body.code,
		language: req.body.lang
	};
	console.log(solver);
	questions.findOne({_id: new mongodb.ObjectID(id)},function(err,doc){
		doc.submissions.push(solver);
		console.log(doc);
		questions.save(doc,{w: 1},function(err){
			assert.equal(err,null);
			res.json({
				success: true,
				message: 'Question submitted successfully'
			});
		});
	});
});


router.post('/signup', Signup);
module.exports = router;
