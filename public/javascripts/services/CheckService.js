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
			},
			isLoggedIn: function(){
				var token = getToken();
				var payload;
				if(token){
					payload = token.split('.')[1];
					payload = $window.atob(payload);
					payload = JSON.parse(payload);
					//return payload.exp > Date.now()/1000;
					console.log(payload);
					return false;
				}
				else{
					return false;
				}

			}

		};
	}]);