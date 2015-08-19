var app = angular.module('app');

app.directive('choiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/choice_question.html',
        controller: ['$scope', function ($scope) {

        }]
    }
    });