var app = angular.module('app');

app.directive('multiplechoiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            answer: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/multiplechoice_question.html',
        controller: ['$scope', function ($scope) {

            $scope.toggleAnswerOption= function(option_index) {
                if(angular.isUndefined($scope.answer)) {
                    $scope.answer = [];
                }
                var answer_index = $scope.answer.indexOf(option_index);
                if(answer_index >= 0) {
                    $scope.answer.splice(answer_index, 1);
                } else {
                    $scope.answer.push(option_index);
                }

            };

        }]
    }
    });