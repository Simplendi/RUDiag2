var app = angular.module('app');

app.directive('choiceQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled',
            answer: '=',
            showResult: '=showResult'
        },
        templateUrl: 'views/directives/choice_question_editor.html',
        controller: ['$scope', function($scope) {
            if(angular.isUndefined($scope.data.content)) {
                $scope.data.content = {}
            }
            $scope.addChoice = function() {
                if(angular.isUndefined($scope.data.content.choices)) {
                    $scope.data.content.choices = []
                }
                $scope.data.content.choices.push("");
            };
            $scope.deleteChoice = function($index) {
                $scope.data.content.choices.splice($index, 1);
                for(var answer_index = 0; answer_index < $scope.data.answers.length; answer_index++) {
                    if($scope.data.answers[answer_index] >= $scope.data.content.choices.length) {
                        $scope.data.answers.splice(answer_index, 1);
                    }
                }
            };
            $scope.answerIsRight = function() {
                return $scope.data.answers.indexOf($scope.answer) >= 0;
            }
        }]
    }
});