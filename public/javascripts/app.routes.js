/**
* codeslam.routes Module
*
* Description
*/
var app = angular.module('routes', ['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/client/views/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})

		.when('/login',{
			templateUrl: '/client/views/login.html',
			controller: 'loginController',
			controllerAs: 'login'
		})
		.when('/signup',{
			templateUrl: '/client/views/signup.html',
			controller: 'signupController',
			controllerAs: 'signup'
		})
		.when('/about',{
			templateUrl: '/client/views/about.html',
			controller: 'aboutController',
			controllerAs: 'about'
		})
		.when('/code',{
			templateUrl: '/client/views/code.html' ,
			controller: 'codeController' ,
			controllerAs: 'code'
		})
		.when('/user/home',{
			templateUrl: '/client/views/create.html',
			controller: 'createController',
			controllerAs: 'create'
		})
		.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(true);
});