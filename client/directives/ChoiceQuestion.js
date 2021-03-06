var app = angular.module('app');

app.directive('choiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            answer: '=',
            previousAnswers: '=',
            disabled: '=ngDisabled',
            showResult: '=showResult'
        },
        templateUrl: 'views/directives/choice_question.html',
        controller: ['$scope', function ($scope) {
            $scope.answerIsRight = function() {
                return $scope.data.answers.indexOf($scope.answer) >= 0;
            };

            $scope.shouldBlockAnswer = function(optionIndex) {
                return angular.isDefined($scope.previousAnswers) && $scope.previousAnswers.indexOf(optionIndex) >= 0
            }

        }]
    }
    });