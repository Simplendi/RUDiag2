var app = angular.module('app');

app.directive('questionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            inline: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/question_editor.html',
        controller: ['$scope', function($scope) {

        }]
    }
});