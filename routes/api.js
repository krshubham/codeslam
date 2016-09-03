var express = require('express');
var router = express.Router();

router.post('/login',function(req,res,next){
	console.log(req.body);
	res.send('hello');
});