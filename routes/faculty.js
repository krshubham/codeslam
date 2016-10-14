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
    console.log(req.headers['x-access-token']);
    var email = xss(req.body.email),
        password = xss(req.body.password),
        //so we get the ip address for any nasty actions
        address = req.connection.remoteAddress;
    //make sure they are not null;
    if (!email || !password || !address || !validate.isEmail(email)) {
        console.log('validation error');
        return res.redirect('/error');
    }
    /*************************************
     MAKE SURE TO CHANGE THIS IN FINAL SUBMIT
     *************************************/
    //change to faculty in final case
    const faculties = db.get().collection('users');
    const faculty = {
        email: email
    }
    try {
        faculties.findOne(faculty, function (err, user) {
            assert.equal(err, null);
            //console.log(user);
            assert.notEqual(user, null);
            bcrypt.compare(password, user.password, function (err, result) {
                assert.equal(err, null);
                if (!result) {
                    //Result is not there, password wrong
                    console.log('Error in password');
                    return res.json({
                        success: false,
                        message: 'Something is wrong! Please try again.'
                    });
                }
                else {
                    //everything is fine,
                    //Give the token to the user.
                    var item = {
                        email: user.email,
                        name: user.name,
                        ip: address
                    };
                    //sign the token to the user
                    var token = jwt.sign(item, secret, {
                        expiresIn: 3600
                    });
                    var mailOptions = {
                        from: '"CodeslamAdmin" <admin@codeslam.com>', // sender address
                        to: email, // list of receivers
                        subject: 'Recent login', // Subject line
                        html: 'You just now logged in with the IP address: ' + address + '<br />'  // html body
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log('mailer error');
                            return res.redirect('/error');
                        }
                        else {
                            res.json({
                                success: true,
                                token: token
                            });
                        }
                    });
                    //send the correct response to the user
                    // return res.json({
                    //     success: true,
                    //     token: token
                    // });
                }
            });
        });
    }
    catch (err) {
        console.log('routing error');
        return res.redirect('/error');
    }
});
module.exports = router;
