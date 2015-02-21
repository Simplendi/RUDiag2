var app = angular.module('app');

app.factory('loginService', ['$http', function($http) {
    return {
        getLoginStatus: function() {
            return $http.get('/login');
        },
        doLogin: function(username, password) {
            return $http.post('/login', {'username': username, 'password': password});
        },
        doLogout: function() {
            return $http.post('/logout');
        }
    }
}]);