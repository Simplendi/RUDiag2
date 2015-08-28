var app = angular.module('app');

app.directive('openQuestionAnswerEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/open_question_answer_editor.html',
        controller: ['$scope', function($scope) {
            $scope.addAnswer = function() {
                if(angular.isUndefined($scope.data.answers)) {
                    $scope.data.answers = [];
                }
                $scope.data.answers.push("");
            };

            $scope.deleteAnswer = function(answer_index) {
                $scope.data.answers.splice(answer_index, 1);
            }
        }]
    }
});