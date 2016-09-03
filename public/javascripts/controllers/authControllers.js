/**
* codeslam Module
*
* Description
*/
var app = angular.module('codeslam.controllers', [])

//global variable for setting the title of the page
var title = '';

app.controller('loginController', function(){
	var vm  = this;
});

app.controller('signupController', function(){
	var vm = this;
	vm.name = 'SuperMan';
});

