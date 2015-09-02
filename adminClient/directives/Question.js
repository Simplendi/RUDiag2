var app = angular.module('app');

app.directive('question', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled',
            answer: '=',
            showResult: '=showResult'
        },
        templateUrl: 'views/directives/question.html',
        controller: ['$scope', function($scope) {

        }]
    }
});