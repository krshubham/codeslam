var express = require('express');
var router = express.Router();
var assert = require('assert');
var fs = require('fs');
var cuid = require('cuid');
var exec = require('child_process').exec;
var colors = require('colors');


function PythonWithoutInputs(req, res, next) {
    var code = req.body.code;
    var lang = req.body.lang;
    // console.log(lang) ;

    var filename = cuid.slug();
    var path = './temp/';
    // console.log(filename) ;
    // console.log('The filename is' + filename + "and the code is" + code);

    fs.writeFile(path + filename + '.py', code, function (err) {
        assert.equal(err, null);
        var command = 'python3 ' + path + filename + '.py';
        //console.log(command);
        exec(command, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
            console.log(stderr);
            console.log(err);
            console.log('INFO: ' + filename + '.py successfully executed !');
            //console.log(out);
            res.json({ output: stdout, error: stderr });

        });

    });
}

function CppWithoutInputs(req, res) {
    var code = req.body.code,
        lang = req.body.lang;
    console.log(lang);
    //console.log(code);
    var path = './temp/';
    var filename = cuid.slug();
    console.log(filename);
    console.log('The language used was: ' + lang + ' and the code is: ' + code);
    fs.writeFile(path + filename + '.cpp', code, function (err) {
        assert.equal(err, null);
        //console.log('file made with the name '+ filename);
        var command = 'g++ ' + path + filename + '.cpp -o ' + path + filename;
        console.log(command);
        exec(command, function (err, stdout, stderr) {
            console.log(stderr);
            console.log(err);
            //assert.equal(err,null);
            //assert.equal(stderr,null);
            exec(path + filename, function (a, b, c) {
                //console.log(a);
                res.json({ output: b, error: c });
                //console.log(c);
            });
        });
    });
}

function javaWithoutInputs(req,res){
    var code = req.body.code;
    var path = './temp/';
    var filename = 'Main';
    console.log(path+filename);
    fs.writeFile(path + filename + '.java',code,function(err){
        assert.equal(err,null);
        var command = 'javac ' + path + filename +'.java';
        console.log(command);
        exec(command,function(err,stdout,stderr){
            var execCommand = 'java ' + path + filename;
            exec(execCommand,function(err,stdout,stderr){
                console.log(err);
                console.log(stdout);
                console.log(stderr);
                res.json({
                    output: stdout,
                    error: stderr
                });
            }); 
        });
    });
}

router.post('/compile',function(req,res){
    var code = req.body.code,
    lang = req.body.lang;
    console.log(lang);
    switch(lang){
        case 'c_cpp':
            CppWithoutInputs(req,res);
            break;
        case 'python':
            PythonWithoutInputs(req,res);
            break;
        case 'java':
            javaWithoutInputs(req,res);
            break;
        default:
            res.send('Incorrect choice');
    }
});



module.exports = router;