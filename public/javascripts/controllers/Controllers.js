/**
* codeslam Module
*
* Description
*/
var app = angular.module('codeslam.controllers', [])

//global variable for setting the title of the page
var title = '';

app.controller('mainController',function(){
	var vm = this;
	title = 'Welcome';
	vm.title = title;
});

app.controller('homeController',function(){
	var vm = this;
	var fuck = 'hello';
	vm.me = fuck;
});

app.controller('loginController', ['$http','AuthService',function($http,AuthService){
	var vm  = this;
	vm.submitForm = function($http,AuthService){
		console.log(email);
	};
}]);

app.controller('signupController', function(){
	var vm = this;
	vm.name = 'SuperMan';
});

app.controller('codeController', function(){
	var vm = this;
	vm.name = 'code';
});