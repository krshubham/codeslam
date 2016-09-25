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
        exec(command,{maxBuffer: 1024 * 500},function (err, stdout, stderr) {
            console.log(stderr);
            console.log(err);
            console.log('INFO: ' + filename + '.py successfully executed !');
            //console.log(out);
            res.json({output: stdout,error: stderr});

        });

    });
}



router.post('/compile', PythonWithoutInputs);



module.exports = router;