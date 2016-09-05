angular.module('codeslam.services', [])
	// super simple service
	// each function returns a promise object 
	.factory('AuthService', ['$http',function($http) {
		return {
			login : function(user) {
				return $http.post('/api/login',user);
			},
			signup : function(user) {
				return $http.post('/api/signup',user);
			}
			isLoggedIn: function(token){
				
			}
		};

	}]);