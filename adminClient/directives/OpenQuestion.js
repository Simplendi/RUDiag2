var app = angular.module('app');

app.directive('openQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/open_question.html',
        controller: ['$scope', function ($scope) {

        }]
    }
    });