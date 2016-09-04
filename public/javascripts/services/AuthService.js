/**
* codeslam.services Modul
*
* Description
*/
var app = angular.module('codeslam.services', []);


app.service('AuthService', ['$http', function($http){
	return {
		login: function(user){
			return $http.post('/api/login',user);
		},
		signup: function(user){
			return $http.post('/api/signup',user);
		}
	};
}]);