/**
* codeslam.routes Module
*
* Description
*/
var app = angular.module('codeslam.routes', ['ngRoute']);

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
		});

		$locationProvider.html5Mode(true);
});