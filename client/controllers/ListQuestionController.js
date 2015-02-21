var app = angular.module('app');

app.controller('ListQuestionController', ['$scope', 'questionService', function($scope, questionService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.questions = [];

    // Function to load questions
    $scope.loadQuestions = function() {
        questionService.listQuestion($scope.filter)
            .success(function(questions) {
                $scope.questions = questions;
            });
    };


    // Load the questions now
    $scope.loadQuestions();

}]);