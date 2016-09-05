/**
* codeslam.services Module
*
* Description
*/
angular.module('codeslam.services', [])
	.factory('Check', ['$window', function($window){
		return {
			getToken : function(){
				return $window.localStorage['codeslam-token'];
			},

			saveToken: function(token){
				$window.localStorage['codeslam-token'] = token;
			},

			logout: function(){
				$window.localStorage.removeItem('codeslam-token');
			}

		};
	}]);