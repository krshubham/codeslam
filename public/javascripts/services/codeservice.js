angular.module('codeservice',[])
 
 //==============================================
 // Code factory exclusively for all the code transactions
 //with the server.
//===========================================

.factory('Code',function($http){
	
	//creating a factory object
	var codeFactory = {};

	codeFactory.send = function(code){
		return $http.post('/code/compile',code)
		.success(function(data){
			return data;
		})
		.error(function(data){
			return data;
		});
	};

	return codeFactory;

});

