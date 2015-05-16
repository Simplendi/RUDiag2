var app = angular.module('app');

app.directive('testTextEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/test_text_editor.html',
        controller: ['$scope', function($scope) {

        }]
    }
});