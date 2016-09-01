/**
* codeslam.routes Module
*
* Description
*/
var app = angular.module('codeslam.routes', ['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		});
});