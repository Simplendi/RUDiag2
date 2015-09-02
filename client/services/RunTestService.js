var app = angular.module('app');

app.factory('runTestService', ['$http', function($http) {
    return {
        getTestInfo: function(test_id) {
            return $http.get('/run/test/' + test_id + '/info');
        },
        requestInvite: function(test_id, invite_data) {
            return $http.post('/run/test/' + test_id + '/invite', invite_data)
        },
        getTestUsingSession: function(session_id) {
            return $http.get('/run/test_session/' + session_id + '/test');
        },
        getTestSession: function(session_id) {
            return $http.get('/run/test_session/' + session_id);
        },
        updateTestSession: function(session_id, session_data) {
            return $http.post('/run/test_session/' + session_id, session_data);
        },
        closeTestSession: function(session_id, session_data) {
            return $http.post('/run/test_session/' + session_id + '/close', session_data);
        }
    }
}]);