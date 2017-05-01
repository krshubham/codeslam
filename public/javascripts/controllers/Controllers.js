/**
* codeslam Module
*
* Description
*/
var app = angular.module('controllers', ['authservice', 'codeservice', 'facultyservice']);

//global variable for setting the title of the page
var title = '';
var loading = false;

app.controller('mainController', ['Auth', 'facAuth', '$location', function (Auth, facAuth, $location) {
	var vm = this;
	title = 'Welcome';
	vm.title = title;
	vm.path = '/';
	vm.loggedIn = function () {
		if (Auth.isLoggedIn()) {
			vm.path = '/user/home';
			var user = Auth.getUser() || facAuth.getFac();
			if (user) {
				vm.name = user.name.split(' ')[0];
				vm.email = user.email;
				vm.username = user.username;
			}
			return true;
		}
		else if (facAuth.isLoggedIn()) {
			vm.path = '/faculty/home';
			var faculty = facAuth.getFac();
			if (faculty) {
				vm.name = faculty.name.split(' ')[0];
				vm.email = faculty.email;
				vm.username = faculty.username;
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
		facAuth.logout();
		$location.path('/');
	}
	vm.loading = function () {
		return loading;
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
	vm.checkUserName = function (obj) {
		var label = document.getElementById('userNameLabel');
		var name = vm.person.username;
		if (name && name.length >= 6 && name.length <= 15) {
			var toCheck = {
				username: name
			};
			Auth.check(toCheck).then(function (data) {
				if (data.data.success) {
					console.log('available');
					vm.availableUser = true;
					label.style.color = 'green';
				}
				else {
					console.log('not available');
					vm.availableUser = false;
					label.style.color = 'red';
				}
			});
		}
		else {
			label.style.color = 'rgba(0,0,0,0.87)';
		}
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
						loading = false;
						$location.path('/login');
					}
					else {
						vm.emailErr = true;
						loading = false;
						vm.message = data.message;
						return false;
					}
				})
				.error(function (data) {
					alert('Some error Occured!');
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
	var user = Auth.getUser();
	if (user) {
		vm.name = user.name.split(' ')[0];
	}
}]);

app.controller('errorController', [function () {
	var vm = this;
}]);


//protected route
app.controller('challengeViewController', ['challengeFactory', '$location', '$route', function (challengeFactory, $location, $route) {
	var vm = this;
	loading = true;
	vm.init = function () {
		challengeFactory.get().then(function (data) {
			vm.questions = data.questions;
			console.log(vm.questions[0]);
			if (vm.questions.length === 0) {
				none = true;
				loading = false;
			}
			else {
				loading = false;
				none = false;
			}
			console.log(vm.questions.length);
		}, function (err) {
			loading = false;
			console.log(err);
		});
	};
	vm.solve = function (obj) {
		var id = obj.question._id;
		console.log(id);
		$location.path('/code/' + id);
	}
}]);

app.controller('challengeSolveController', ['$location', 'getChallenge', '$window', '$route', function ($location, getChallenge, $window, $route) {
	var vm = this;
	var id = $location.$$path.split('/')[2];
	vm.init = function () {
		console.log(id);
		getChallenge.get(id).then(function (data) {
			console.log(data);
			vm.question = data.question.question;
			console.log(vm.question);
			vm.questionId = data.question._id;
			vm.facultyName = data.question.name;
		}, function (err) {
			console.log(err);
		});
	}

	vm.submit = function () {
		loading = true;
		var code = editor.getValue().trim();
		console.log(code);
		if(!code){
			$window.alert('Not even a single line of code written');
			window.location.reload();
			return false;
		}		
		var lang = vm.language;
		if(lang === 'c_cpp'){
			lang = 'c_cpp';
		}
		console.log(lang);
		var values = {
			code: code,
			lang: lang
		};
		getChallenge.submit(id,values).then(function(data){
			loading = false;
			console.log('here');
			console.log(data);
			$location.path('/user/home');
		},function(data){
			console.log(data);
		});
	}
}]);