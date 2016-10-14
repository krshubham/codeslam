var express = require('express');
var router = express.Router();
var db = require('./db');
const assert = require('assert');
var faculties = null;
var secret = 'f@csecret@@!%^';
var jwt = require('jsonwebtoken');
var xss = require('xss');
const bcrypt = require('bcrypt');
const rounds = 10;
var validate = require('validator');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://codeslamvitc%40gmail.com:admin@911@smtp.gmail.com');


//here we get the login request on POST /faculty/login
router.post('/login', function (req, res) {
    var email = xss(req.body.email),
        password = xss(req.body.password),
        //so we get the ip address for any nasty actions
        address = req.connection.remoteAddress;
    //make sure they are not null;
    if (!email || !password || !address || !validate.isEmail(email)) {
        return res.redirect('/error');
    }
    const faculties = db.get().collection('faculty');
    const faculty = {
        email: email,
        password: password
    }
    try {
        faculties.findOne(faculty, function (err, user) {
            assert.equal(err, null);
            assert.notEqual(doc, null);
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
                        ip: address
                    };
                    //sign the token to the user
                    var token = jwt.sign(item, secret, {
                        expiresIn: 3600
                    });
                    //send the correct response to the user
                    return res.json({
                        success: true,
                        token: token
                    });
                }
            });
        });
    }
    catch (err) {
        return res.redirect('/error');
    }
});
module.exports = router;
