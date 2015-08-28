var app = angular.module('app');

app.directive('contentEditor', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/content_editor.html',
            controller: ['$scope', '$modal', function ($scope, $modal) {
                $scope.basicCommand = function (command, $event) {
                    $event.preventDefault();
                    document.execCommand(command, false, null);
                };

                $scope.editHtml = function ($event) {
                    var html = $scope.model.$viewValue;

                    var editHtmlModal = $modal.open({
                        templateUrl: 'views/directives/content_editor_html.html',
                        controller: 'ContentEditorHtmlModalController',
                        resolve: {
                            html: function () {
                                return html;
                            }
                        }
                    });
                    editHtmlModal.result.then(function (html) {
                        $scope.model.$setViewValue(html);
                        $scope.model.$render();
                    });


                }
            }
            ]
        }
    }
);


app.controller('ContentEditorHtmlModalController', ['$scope', '$modalInstance', 'html', function ($scope, $modalInstance, html) {
    $scope.html = html;
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
    $scope.ok = function () {
        $modalInstance.close($scope.html);
    }
}]);
