var app = angular.module('app');

app.factory('runTestService', ['$http', function($http) {
    return {
        getTest: function(test_id) {
            return $http.get('/run/test/' + test_id);
        },
        requestInvite: function(test_id, invite_data) {
            return $http.post('/run/test/' + test_id + '/invite', invite_data)
        },
        getTestSession: function(session_id) {
            return $http.get('/run/test_session/' + session_id);
        },
        updateTestSession: function(session_id, session_data) {
            return $http.post('/run/test_session/' + session_id, session_data);
        }
    }
}]);