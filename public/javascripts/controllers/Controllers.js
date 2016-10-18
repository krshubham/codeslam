/**
* codeslam Module
*
* Description
*/
var app = angular.module('controllers', ['authservice', 'codeservice']);

//global variable for setting the title of the page
var title = '';
var loading = false;

app.controller('mainController', ['Auth', '$location', function (Auth, $location) {
	var vm = this;
	title = 'Welcome';
	vm.title = title;
	vm.path = '/';
	vm.loggedIn = function () {
		if (Auth.isLoggedIn()) {
			vm.path = '/user/home';
			var user = Auth.getUser();
			if (user) {
				vm.name = user.name.split(' ')[0];
				vm.email = user.email;
			}
			return true;
		}
		else {
			vm.path = '/';
			return false;
		}
	}
	vm.logout = function () {
		Auth.logout();
		$location.path('/');
	}
	vm.loading = function () {
		if (loading) {
			return true;
		}
		else {
			return false;
		}
	}
}]);

app.controller('homeController', function () {
	var vm = this;
});

app.controller('loginController', ['Auth', '$location', '$window', function (Auth, $location, $window) {
	var vm = this;
	vm.error = false;
	if (Auth.isLoggedIn()) {
		$location.path('/user/home');
	}
	vm.submitForm = function () {
		loading = true;
		var user = vm.user;
		Auth.login(user)
			.then(function (status) {
				if (status.data.success) {
					loading = false;
					$location.path('/user/home');
				}
				else {
					loading = false;
					vm.error = true;
					vm.message = status.data.message;
				}
			});
	};
}]);

app.controller('signupController', ['Auth', '$location', '$window', function (Auth, $location, $window) {
	var vm = this;
	var success = false;
	vm.error = false;
	vm.checkPassword = function () {
		if (vm.person.password !== vm.person.cp) {
			vm.error = true;
		}
		else {
			vm.error = false;
		}
	}
	//function to check if the username is available
	vm.checkUserName = function(){
		var name = vm.person.username;
		var toCheck = {
			name: name
		};
		Auth.check(toCheck).then(function(data){
			console.log(data);
		});
	}	




	vm.submitForm = function () {
		if (vm.error)
			return false;
		else {
			loading = true;
			//console.log(loading);
			var user = vm.person;
			//console.log(user);
			Auth.signup(user)
				.success(function (data) {
					console.log(data);
					if (data.success) {
						Materialize.toast('Verification Email sent successfuly', 5000)
						//console.log('Loading done');
						loading = false;
						$location.path('/login');
					}
					else {
						vm.emailErr = true;
						loading = false;
						vm.message = data.message;
						return false;
					}
				});
		}
	};
}]);

app.controller('codeController', ['Code', function (Code) {
	var vm = this;
	vm.name = 'code';
	vm.out = "Let's see!";
	vm.submit = function () {
		var code = editor.getValue();
		var lang = vm.lang;
		if (lang === undefined || lang === '') {
			alert('Choose correct programming language');
			return false;
		}
		else {
			var data = {
				code: code,
				lang: lang
			};
			Code.send(data).then(function (data) {
				console.log(data);
				vm.out = data.data.output;
				$('#modal1').openModal();
			});
		}
	};
}]);

app.controller('aboutController', function () {
	var vm = this;
	vm.name = 'code';
});


//This is the controller that will control the upload of file and some other details from the user.
app.controller('createController', ['Auth', '$location', '$window', function (Auth, $location, $window) {
	var vm = this;
	if (Auth.isLoggedIn()) {
		var user = Auth.getUser();
		if (user) {
			console.log(user);
			vm.name = user.name.split(' ')[0];
		}
		else {
			$location.path('/login');
		}
		vm.codeNow = function (num) {
			console.log(num);

		}
	}
	else {
		$location.path('/login');
	}
}]);

app.controller('errorController', [function () {
	var vm = this;
}]);


