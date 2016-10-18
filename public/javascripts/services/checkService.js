angular.module('checkservice',[])
 

.factory('Check',function($http){
	
	//creating a factory object
	var checkFactory = {};

	checkFactory.send = function(name){
		return $http.post('/check',name)
		.success(function(data){
			return data;
		})
		.error(function(data){
			return data;
		});
	};

	return checkFactory;

});

