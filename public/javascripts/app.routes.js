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
			templateUrl: '/client/views/faculty_view.html',
			controller: 'facultyHomeCtrl',
			controllerAs: 'fhc',
			requireLogin: true,
			role: 'faculty',
			faculty: true
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
		.when('/faculty/create', {
			templateUrl: '/client/views/faculty_create.html',
			controller: 'challengeCreateCtrl',
			controllerAs: 'cc',
			requireLogin: true,
			faculty: true
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
})
	.run(function ($rootScope, $location, $window, Auth, $route, facAuth) {
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			if ((!Auth.isLoggedIn() && next.$$route.requireLogin) || (!facAuth.isLoggedIn() && next.$$route.requireLogin)) {
				$location.path('/login');
			}
			else if(!facAuth.isLoggedIn() && next.$$route.faculty){
				$location.path('/faculty');
			}
		});
	});


