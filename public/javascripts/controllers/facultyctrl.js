var app = angular.module('facultyctrl', ['facultyservice']);


app.controller('facultyloginController', ['facAuth', function (facAuth) {
	var vm = this;
	var faculty = vm.faculty;
	var vm.login = function (faculty) {
		console.log(faculty);
		facAuth.login(faculty).then(function (status) {
			if (status.data.success) {
				$location.path('/faculty/home');
			}
			else {
				vm.error = true;
			}
		});
	};
}]);