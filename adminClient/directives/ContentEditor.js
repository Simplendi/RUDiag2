var app = angular.module('app');

app.directive('contentEditor', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/content_editor.html',
            controller: ['$scope', function ($scope) {
                $scope.basicCommand = function(command, $event) {
                    $event.preventDefault();
                    document.execCommand(command, false, null);
                };
            }
            ]
        }
    }
);
