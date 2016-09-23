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
var cuid = require('cuid');
var secret = 'g@@k@911';
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://kumarshubham347%40gmail.com:shubh1997@smtp.gmail.com');

//The login handler for the api
router.post('/login', function (req, res, next) {
	//checking if the code is executing or not
	console.log('received the request for login');

	//getting all the data from the users collection
	users = db.get().collection('users');

	//preventing the xss vulnerable characters from entering the db.
	var email = xss(req.body.email);
	var password = xss(req.body.password);
	var person = {
		email: email,
	}
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
					message: 'Something is wrong Please try again.'
				});
			}
			else {
				//user is found
				//Now we compare the password of the user
				bcrypt.compare(password, user.password, function (err, result) {
					assert.equal(err, null);
					if (!result) {
						//Result is not there, assword wrong
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
		password = xss(req.body.password),
		confirm_password = xss(req.body.cp);
	try {
		//if js is not enabled, verify here.
		assert.deepEqual(password, confirm_password);
		//make sure that the user does not exist already,
		var user = {
			email: email
		}
		users.findOne(user, function (err, user) {
			assert.equal(err, null);
			console.log('checking the user');
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
					html: '<a href="http://localhost/verify/' + link + '">Click Here</a>' // html body
				};
				console.log(mailOptions.html);
				bcrypt.hash(password, saltRounds, function (err, hash) {
					var user = {
						name: name,
						email: email,
						password: hash,
						v_link: link
					};
					users.insertOne(user, function (err, done) {
						assert.equal(err, null);
						console.log('user inserted');
						return res.json({
							success: true,
							message: 'user successfully created'
						});
					});
				});
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						return console.log(error);
					}
					console.log('Message sent: ' + info.response);
				});
			}
		});
	}
	catch (err) {
		console.log(err.message);
	}
}


/*function CppWithoutInputs(req,res,next){
	var code = req.body.code,
		lang = req.body.lang;
		console.log(lang) ;
		//console.log(code);
		var path = './temp/';
		var filename = cuid.slug();
		console.log(filename);
		console.log('The language used was: '+ lang +' and the code is: '+code);
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
}*/






router.post('/signup', Signup);
module.exports = router;