var app = angular.module('app');

app.factory('questionService', ['$http', function($http) {
    return {
        getQuestion: function(question_id) {
            return $http.get('/question/' + question_id);
        },
        saveQuestion: function(question) {
            return $http.post('/question/' + question.id, question);
        },
        addQuestion: function(question) {
            return $http.put('/question/', question);
        },
        deleteQuestion: function(question) {
            return $http.delete('/question/' + question.id);
        },
        listQuestion: function(filter, empty_filter) {
            return $http({
                url: '/question/',
                method: "GET",
                params: {'filter': filter, 'empty_filter':empty_filter}
            });
        }

    }
}]);