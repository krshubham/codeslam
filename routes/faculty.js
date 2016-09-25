var express = require('express');
var router = express.Router();
var db = require('./db');
var faculties = null;
var secret = 'f@csecret@@!%^';
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://codeslamvitc%40gmail.com:admin@911@smtp.gmail.com');

router.post('/login', function (req, res) {
    // var email = req.body.email,
    //     password = req.body.password;
    //     console.log(req.body);
    //     res.redirect('/error');
    return res.redirect('/error');
});
module.exports = router;
