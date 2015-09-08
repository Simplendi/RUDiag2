var app = angular.module('app');

app.directive('routeQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled',
        },
        templateUrl: 'views/directives/route_question_editor.html',
        controller: ['$scope', function($scope) {
            if(angular.isUndefined($scope.data.content)) {
                $scope.data.content = {}
            }
            $scope.addChoice = function() {
                if(angular.isUndefined($scope.data.content.choices)) {
                    $scope.data.content.choices = []
                }
                $scope.data.content.choices.push("");
            };
            $scope.deleteChoice = function($index) {
                $scope.data.content.choices.splice($index, 1);
            };
        }]
    }
});