var app = angular.module('app');

app.factory('userService', ['$http', function($http) {
    return {
        getUser: function(user_id) {
            return $http.get('/user/' + user_id);
        },
        saveUser: function(user) {
            return $http.post('/user/' + user.id, user);
        },
        addUser: function(user) {
            return $http.put('/user/', user);
        },
        deleteUser: function(user) {
            return $http.delete('/user/' + user.id);
        },
        listUser: function(filter) {
            return $http({
                url: '/user/',
                method: "GET",
                params: {filter: filter}
            });
        }

    }
}]);