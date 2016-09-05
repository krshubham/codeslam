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

app.controller('loginController', ['AuthService','$window',function(AuthService,$window){
	var vm  = this;
	vm.submitForm = function(){
		var user = vm.user;
		console.log(user);
		AuthService.login(user)
		.success(function(data){
			$window.localStorage['codeslam-token'] = data.token;
			
			console.log($window.localStorage);
		})
		.error(function(data){
			console.log(data);
		});
	};
}]);

app.controller('signupController',['AuthService','$location','$window', function(AuthService,$location,$window){
	var vm = this;
	var success = false;
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
			AuthService.signup(user)
			.success(function(data){
				if(data.success){
					$location.path('/login');
				}
				else{
					alert('fucked up');
				}

			})
			.error(function(data){
				console.log(data);
			});
		}
	};
}]);

app.controller('codeController', function(){
	var vm = this;
	vm.name = 'code';
});
