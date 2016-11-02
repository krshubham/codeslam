var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
var xss = require('xss');
var mustache = require('mustache');
var jwt = require('jsonwebtoken');
const secret = 'coolcool@#';
var bcrypt = require('bcrypt');
const saltRounds = 10;
var db = require('./db');

router.get('/', function (req, res) {
    console.log('admin login request received');
    var html = fs.readFileSync(path.join(__dirname, 'admin', 'admin.html')).toString();
    res.send(mustache.to_html(html));
});

router.post('/login', function (req, res) {
    var ip = xss(req.connection.remoteAddress);
    var uname = xss(req.body.uname);
    var pwd = xss(req.body.pwd);
    console.log(uname, pwd);
    var item = {
        name: uname
    }
    if (uname === 'krshubham' && pwd === 'shubhi') {
        var token = jwt.sign(item, secret, {
            expiresIn: 3600
        });
        var vm = {
            name: "Kumar Shubham",
            token: token
        }
        var html = fs.readFileSync(path.join(__dirname, 'admin', 'admin_view.html')).toString();
        res.send(mustache.to_html(html, vm));
    }
    else {
        res.redirect('/admin');
    }

    console.log('post req for admin login');
});

router.post('/create/faculty', function (req, res) {
    var faculty = db.get().collection('faculty');
    var token = xss(req.body.token);
    var name = xss(req.body.name);
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.redirect('/admin');
            } else {
                console.log(decoded);
                req.decoded = decoded;
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.redirect('/admin');

    }
    var email = xss(req.body.fac_name);
    var pwd = xss(req.body.fac_pwd);
    var name = xss(req.body.name);
    bcrypt.hash(pwd, saltRounds, function (err, hash) {
        if (err) {
            return res.redirect('/error');
        }
        else {
            var fac = {
                name: name,
                email: email,
                password: hash
            }
            faculty.insertOne(fac, function (err, done) {
                if (err) {
                    return res.redirect('/error');
                }
                else {
                    console.log(fac);
                    console.log('insertion done');
                    res.send('Done!');
                }
            });
        }
    });
});


module.exports = router;