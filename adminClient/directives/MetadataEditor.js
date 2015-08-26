var app = angular.module('app');

app.directive('metadataEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/metadata_editor.html',
        controller: ['$scope', function($scope) {
            $scope.$watch('data.type', function(newValue, oldValue) {
                if(newValue=="url" || newValue == "text") {
                    $scope.data.value = "";
                }
            });
        }]
    }
});