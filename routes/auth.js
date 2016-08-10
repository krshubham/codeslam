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

function doSignup(req,res,next){
	var name = xss(req.body.signup_name),
		email = xss(req.body.signup_email),
		password = xss(req.body.Signup_pwd),
		confirm = xss(req.body.c_pwd);
		try{
			assert.deepEqual(confirm,password);
			db.get()
		}
}

//Routes to do the authentication.
router.post('/signup',doSignup);
router.post('/login',doLogin);


module.exports = router;
