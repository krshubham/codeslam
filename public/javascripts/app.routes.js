/**
* codeslam.routes Module
*
* Description
*/
var app = angular.module('routes', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/client/views/home.html',
			controller: 'homeController',
			controllerAs: 'home',
			requireLogin: false
		})
		.when('/login', {
			templateUrl: '/client/views/login.html',
			controller: 'loginController',
			controllerAs: 'login',
			requireLogin: false
		})
		.when('/signup', {
			templateUrl: '/client/views/signup.html',
			controller: 'signupController',
			controllerAs: 'signup',
			requireLogin: false
		})
		.when('/about', {
			templateUrl: '/client/views/about.html',
			controller: 'aboutController',
			controllerAs: 'about',
			requireLogin: false
		})
		.when('/code', {
			templateUrl: '/client/views/code.html',
			controller: 'codeController',
			controllerAs: 'code',
			requireLogin: false
		})
		.when('/user/home', {
			templateUrl: '/client/views/create.html',
			controller: 'createController',
			controllerAs: 'create',
			requireLogin: true,
			role: 'student'
		})
		.when('/faculty', {
			templateUrl: '/client/views/faculty_login.html',
			controller: 'facultyloginController',
			controllerAs: 'flc',
		})
		.when('/faculty/home', {
			templateUrl: '/client/views/faculty_home.html',
			controller: 'FacultyHomeController',
			controllerAs: 'fhc',
			requireLogin: true,
			role: 'faculty'
		})
		.when('/error', {
			templateUrl: '/client/views/error.html',
			controller: 'errorController',
			controllerAs: 'error'
		})
		.when('/user/challenges', {
			templateUrl: '/client/views/challenges.html',
			controller: 'challengeCtrl',
			controllerAs: 'challenge',
			requireLogin: true,
			resolve: {
				access: ["Auth", function (Auth) {
					console.log('here');
					console.log(Auth.isLoggedIn());
					return Auth.isLoggedIn();
				}]
			}
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
})
	.run(["$rootScope", "$route", "Auth", "$location", function ($rootScope, Auth, $location, $route) {
		$rootScope.$on("$locationChangeStart", function (event, current, previous, rejection) {
			console.log(rejection);

			// if ($route.$$path.indexOf('/user/') !== -1) {
			// 	if ($location.isLoggedIn()) {
			// 		console.log('You have the access');
			// 	}
			// 	else {
			// 		console.log("you dont have the access");
			// 	}
			// }
			// else {
			// 	console.log('unauthenticated route');
			// }
		});
	}]);