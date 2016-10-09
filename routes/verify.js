var express = require('express');
var router = express.Router();
var db = require('./db');
var assert = require('assert');
var users = null;
var tempUsers = null;


function verify(req, res) {
    //console.log(req.params.id);
    tempUsers = db.get().collection('tempUsers');
    users = db.get().collection('users');
    tempUsers.findOne({ v_link: req.params.id }, function (err, found) {
        try {
            assert.equal(err, null);
            //console.log('hey' + found);
            if (!found) {
                //console.log('Not in the temp dir');
                res.redirect('/error');
            }
            else {
                delete found.v_link;
                var perma_user = found;
                users.findOne({ email: found.email }, function (err, user) {
                    assert.equal(err, null);
                    if (user) {
                        //console.log('User already exists');
                        res.redirect('/error');
                    }
                    else {
                        users.insertOne(perma_user, function (err, okay) {
                            assert.equal(err, null);
                            if (!okay) {
                                //console.log('Not able to insert into perma db');
                                res.redirect('/error');
                            }
                            else {
                                //console.log('peram db insertion done');
                                res.redirect('/login');

                            }
                        });
                        tempUsers.deleteOne(found, function (err, done) {
                            assert.equal(err, null);
                            if (!done) {
                                //console.log('unable to delete');
                                res.redirect('/error');
                            }
                            else {
                                //console.log('Tempuser deleted');
                            }
                        });
                    }
                });
            }
        }
        catch (err) {
            res.redirect('/error');
            //console.log(err);
        }
    });
}



router.get('/:id', verify);

module.exports = router;