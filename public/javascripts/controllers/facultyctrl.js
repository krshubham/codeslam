var app = angular.module('facultyctrl', ['facultyservice']);


app.controller('facultyloginController', ['facAuth', function (facAuth) {
	var vm = this;
	vm.login = function () {
		console.log(vm.faculty);
	};
}]);