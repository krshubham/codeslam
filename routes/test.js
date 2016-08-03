var express = require('express');
var router = express.Router();
var assert = require('assert');
var xss = require('xss');
var mongo = require('mongodb').MongoClient;
var validate = require('validator');
var bcrypt = require('bcrypt-nodejs');
var url = 'mongodb://localhost:27017/slam'
var db = require('./db');

function CheckifUserExists(email,password){
	
}


function handleLogin(req,res,next){
	var email = req.body.login_email;
	var pwd = req.body.login_pwd;
	try{
		CheckifUserExists(email,pwd);
	}	
}





//Get route for login page
router.post('/login',handleLogin);


















module.exports = router;