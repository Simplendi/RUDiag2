var app = angular.module('app');

app.directive('choiceQuestionAnswerEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/choice_question_answer_editor.html',
        controller: ['$scope', function($scope) {
            $scope.addAnswer = function() {
                if(angular.isUndefined($scope.data.answers)) {
                    $scope.data.answers = [];
                }
                $scope.data.answers.push(0);
            };

            $scope.deleteAnswer = function(answer_index) {
                $scope.data.answers.splice(answer_index, 1);
            }
        }]
    }
});