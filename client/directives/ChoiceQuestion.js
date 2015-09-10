var app = angular.module('app');

app.directive('choiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            answer: '=',
            disabled: '=ngDisabled',
            showResult: '=showResult'
        },
        templateUrl: 'views/directives/choice_question.html',
        controller: ['$scope', function ($scope) {
            $scope.answerIsRight = function() {
                return $scope.data.answers.indexOf($scope.answer) >= 0;
            }

        }]
    }
    });