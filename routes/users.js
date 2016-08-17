var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


//Some settings for the online compiler:

var options = {
	stats: true
};

compiler.init(options);
var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile ) 

/*End of compiler specific code*/

function CompileAndRun(){
	
}
 
compiler.compileCPPWithInput(envData , code , input , function (data) {
	res.send(data);
});



router.post('/code',CompileAndRun);

module.exports = router;
