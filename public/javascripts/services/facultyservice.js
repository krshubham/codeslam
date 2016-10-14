angular.module('facultyservice', [])

	// ===================================================
	// auth factory to login and get information
	// inject $http for communicating with the API
	// inject $q to return promise objects
	// inject AuthToken to manage tokens
	// ===================================================
	.factory('facAuth', function ($http, $q, AuthToken, $window) {

		// create auth factory object
		var authFactory = {};

		// log a faculty in
		authFactory.login = function (faculty) {

			// return the promise object and its data
			console.log(faculty);
			return $http.post('/faculty/login', faculty)
				.success(function (data) {
					if (data.token) {
						AuthToken.setToken(data.token);
					}
					return data;
				});
		};

		// log a user out by clearing the token
		authFactory.logout = function () {
			// clear the token
			AuthToken.setToken();
		};
		var payload;
		// check if a user is logged in
		// checks if there is a local token
		authFactory.isLoggedIn = function () {
			var token = AuthToken.getToken();
			if (token) {
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				return payload.exp > Date.now() / 1000;
			}
			else {
				return false;
			}
		};

		// get the logged in user
		authFactory.getFac = function () {
			if (AuthToken.getToken())
				return payload;
			else
				return false;
		};

		// return auth factory object
		return authFactory;

	})

	// ===================================================
	// factory for handling tokens
	// inject $window to store token client-side
	// ===================================================
	.factory('AuthToken', function ($window) {

		var authTokenFactory = {};

		// get the token out of local storage
		authTokenFactory.getToken = function () {
			return $window.localStorage.getItem('facToken');
		};

		// function to set token or clear token
		// if a token is passed, set the token
		// if there is no token, clear it from local storage
		authTokenFactory.setToken = function (token) {
			if (token)
				$window.localStorage.setItem('facToken', token);
			else
				$window.localStorage.removeItem('facToken');
		};

		return authTokenFactory;

	});