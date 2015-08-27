var app = angular.module('app');

app.directive('multiplechoiceQuestionAnswerEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/multiplechoice_question_answer_editor.html',
        controller: ['$scope', function($scope) {
            $scope.addAnswer = function() {
                if(angular.isUndefined($scope.data.answers)) {
                    $scope.data.answers = [];
                }
                $scope.data.answers.push([]);
            };

            $scope.toggleAnswerOption= function(answer_index, option_index) {
                var answer_option_index = $scope.data.answers[answer_index].indexOf(option_index);
                if(answer_index >= 0) {
                    $scope.data.answers[answer_index].splice(answer_option_index, 1);
                } else {
                    $scope.data.answers[answer_index].push(option_index);
                }

            };

            $scope.deleteAnswer = function(answer_index) {
                $scope.data.answers.splice(answer_index, 1);
            }
        }]
    }
});