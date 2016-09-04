/**
* codeslam Module
*
* Description
*/
var app = angular.module('codeslam.controllers', ['codeslam.services'])

//global variable for setting the title of the page
var title = '';

app.controller('mainController',function(){
	var vm = this;
	title = 'Welcome';
	vm.title = title;
});

app.controller('homeController',function(){
	var vm = this;
});

app.controller('loginController', ['AuthService',function(AuthService){
	var vm  = this;
	vm.submitForm = function(){
		var user = vm.user;
		console.log(user);
		AuthService.login(user)
		.success(function(data){
			window.alert(data);
		})
		.error(function(data){
			console.log(data);
		});
	};
}]);

app.controller('signupController', function(){
	var vm = this;
	vm.error = false;
	vm.checkPassword = function(){
		if(vm.person.password !== vm.person.cp){
			vm.error = true;
		}
		else{
			vm.error = false;
		}
	}	
	vm.submitForm = function(){
		if(vm.error)
			return false;
		else{
			var user = vm.person;
			console.log(user);
		}
	};
});

app.controller('codeController', function(){
	var vm = this;
	vm.name = 'code';
});
