var app = angular.module('app');

app.directive('multiplechoiceQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/multiplechoice_question_editor.html',
        controller: ['$scope', function($scope) {
            if(angular.isUndefined($scope.data.options)) {
                $scope.data.options = []
            }
            $scope.addOption = function() {
                $scope.data.options.push("");
            }
        }]
    }
});