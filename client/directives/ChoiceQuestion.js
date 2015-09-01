var app = angular.module('app');

app.directive('choiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            answer: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/choice_question.html',
        controller: ['$scope', function ($scope) {

        }]
    }
    });