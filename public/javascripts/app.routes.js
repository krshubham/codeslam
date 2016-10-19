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
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
})
	.run(function ($rootScope, $location, $window, Auth, $route) {
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			var url = $window.location.pathname;
			if ((!Auth.isLoggedIn()) && (url.indexOf('/user/') !== -1)) {
				$location.path('/login');
			}
		});
	});