var app = angular.module('app');

app.directive('multiplechoiceQuestion', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/multiplechoice_question.html',
        controller: ['$scope', function ($scope) {

        }]
    }
    });