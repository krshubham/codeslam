angular.module('challengeSolveService', [])


    .factory('getChallenge', function ($http, Auth, userAuthToken, $window) {
        var getChallengeFactory = {};
        getChallengeFactory.get = function (id) {
            console.log('I was called');
            var token;
            if (Auth.isLoggedIn()) {
                token = userAuthToken.getToken();
            }
            else {
                token = null;
                alert('Not a valid user session!');
                return false;
            }
            return $http.get('/api/challenge/' + id, {
                headers: {
                    'x-access-token': token
                }
            }).then(function (data) {
                return data.data;
            });
        }
        getChallengeFactory.submit = function (id, values) {
            console.log('submitting the code to server');
            var token;
            if (Auth.isLoggedIn()) {
                token = userAuthToken.getToken();
                values.token = token;
            }
            else {
                token = null;
                alert('Not a valid user session!');
                return false;
            }
            return $http.post('/api/submit/' + id, values)
                .then(function (data) {
                    return data.data;
                });
        }
        return getChallengeFactory;
    })