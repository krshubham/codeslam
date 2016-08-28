var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var vm = {
		title: 'Welcome',
		bootstrap: false,
		material: true,
		index: true
	};
	//res.json(vm);
  	res.render('index', vm);
});
router.get('/stylesheets',function(req,res,next){
	res.send('Not allowed!');
});
module.exports = router;
