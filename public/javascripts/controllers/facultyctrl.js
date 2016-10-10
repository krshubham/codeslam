var app = angular.module('facultyctrl', ['facultyservice']);


app.controller('facultyloginController', ['facAuth', '$location', function (facAuth, $location) {
	var vm = this;
	vm.login = function (faculty) {
		console.log(faculty);
		facAuth.login(faculty).then(function (status) {
			if (status.data.success) {
				$location.path('/faculty/home');
			}
			else {
				vm.error = true;
				$location.path('/error');
			}
		});
	};
}]);