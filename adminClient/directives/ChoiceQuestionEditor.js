var app = angular.module('app');

app.directive('choiceQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/choice_question_editor.html',
        controller: ['$scope', function($scope) {
            if(angular.isUndefined($scope.data.options)) {
                $scope.data.options = []
            }
            $scope.addOption = function() {
                $scope.data.options.push("");
            };
        }]
    }
});