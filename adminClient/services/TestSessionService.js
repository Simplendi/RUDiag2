var app = angular.module('app');

app.factory('testSessionService', ['$http', function($http) {
    return {
        getTestSession: function(test_session_id) {
            return $http.get('/test_session/' + test_session_id);
        },
        saveTestSession: function(test_session) {
            return $http.post('/test_session/' + test_session.id, test_session);
        },
        addTestSession: function(test_session) {
            return $http.put('/test_session/', test_session);
        },
        deleteTestSession: function(test_session) {
            return $http.delete('/test_session/' + test_session.id);
        },
        listTestSession: function(test_id) {
            return $http({
                url: '/test_session/',
                method: "GET",
                params: {test_id: test_id}
            });
        },
        sendInvite: function(test_session_id) {
            return $http.post('/test_session/' + test_session_id + '/send_invite');
        },
        sendFeedback: function(test_session_id) {
            return $http.post('/test_session/' + test_session_id + '/send_feedback');
        }

    }
}]);