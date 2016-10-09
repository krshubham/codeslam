var express = require('express');
var router = express.Router();
var db = require('./db');
var faculties = null;
var secret = 'f@csecret@@!%^';
var jwt = require('jsonwebtoken');
var xss = require('xss');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://codeslamvitc%40gmail.com:admin@911@smtp.gmail.com');

router.post('/login', function (req, res) {
    var email = xss(req.body.email),
        password = xss(req.body.password),
        //so we get the ip address for any nasty actions
        address = req.connection.remoteAddress;
        //make sure they are not null;
    if (!email || !password || !address) {
        return res.redirect('/error');
    }
    else{
        
    }

});
module.exports = router;
