/**
* codeslam Module
*
* Description
*/
var app = angular.module('codeslam.controllers', ['codeslam.services'])

//global variable for setting the title of the page
var title = '';

app.controller('loginController', ['$http','AuthService',function($http,AuthService){
	var vm  = this;
	vm.airplay = AuthService.login(user)
		.success(function(data){
			alert(data);
	});	
}]);

app.controller('signupController', function(){
	var vm = this;
	vm.name = 'SuperMan';
});

