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
		});
		$locationProvider.html5Mode(true);
});