var app = angular.module('app');

app.directive('openQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/open_question_editor.html',
        controller: ['$scope', function($scope) {

        }]
    }
});