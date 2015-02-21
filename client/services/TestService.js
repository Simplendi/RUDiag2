var app = angular.module('app');

app.factory('testService', ['$http', function($http) {
    return {
        getTest: function(test_id) {
            return $http.get('/test/' + test_id);
        },
        saveTest: function(test) {
            return $http.post('/test/' + test.id, test);
        },
        addTest: function(test) {
            return $http.put('/test/', test);
        },
        deleteTest: function(test) {
            return $http.delete('/test/' + test.id);
        },
        listTest: function(filter) {
            return $http({
                url: '/test/',
                method: "GET",
                params: {filter: filter}
            });
        }

    }
}]);