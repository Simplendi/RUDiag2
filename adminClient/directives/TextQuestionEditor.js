var app = angular.module('app');

app.directive('textQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled',
            answer: '='
        },
        templateUrl: 'views/directives/text_question_editor.html',
        controller: ['$scope', function($scope) {

        }]
    }
});