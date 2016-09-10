/**
* codeslam Module
*
* Description
*/
var app = angular.module('controllers', ['authservice']);

//global variable for setting the title of the page
var title = '';

app.controller('mainController',['Auth',function(Auth){
	var vm = this;
	title = 'Welcome';
	vm.title = title;
	vm.loggedIn = function(){
		if(Auth.isLoggedIn()){
			return true;
		}
		else{
			return false;
		}
	}
	vm.logout = function(){
		Auth.logout();
	}
}]);

app.controller('homeController',function(){
	var vm = this;
});

app.controller('loginController', ['Auth','$location','$window',function(Auth,$location,$window){
	var vm  = this;
	vm.submitForm = function(){
		var user = vm.user;
		Auth.login(user)
		.then(function(status){
			console.log(status.data);
		});
	};
}]);

app.controller('signupController',['Auth','$location','$window', function(Auth,$location,$window){
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
			//console.log(user);
			Auth.signup(user)
			.success(function(data) {
				console.log(data);
				if(data.success)
					$location.path('/login');
				else{
					return false;
				}
			});
		}
	};
}]);

app.controller('codeController', function(){
	var vm = this;
	vm.name = 'code';
});

app.controller('aboutController',function(){
	var vm  = this;
	vm.name = 'code';	
});

app.controller('createController', ['Auth','$location','$window',function(Auth,$location,$window){
	var vm = this;
	if(Auth.isLoggedIn()){
		var user = Auth.getUser();
		if(user){
			vm.name = user.name.split(' ')[0];
		}
		else{
			$location.path('/login');
		}
	}	
	else{
		$location.path('/login');
	}
}]);