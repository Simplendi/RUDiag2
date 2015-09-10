var app = angular.module('app');

app.directive('textQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            answer: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/text_question.html',
        controller: ['$scope', function ($scope) {

        }]
    }
    });