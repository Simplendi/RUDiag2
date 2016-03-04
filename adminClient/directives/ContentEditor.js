var app = angular.module('app');

app.directive('contentEditor', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/content_editor.html',
            controller: ['$scope', '$modal', '$timeout', function ($scope, $modal, $timeout) {
                $scope.basicCommand = function (command, $event) {
                    $event.preventDefault();
                    document.execCommand(command, false, null);
                };

                $scope.basicCommandWithValue = function(command, value, $event) {
                    $event.preventDefault();
                    document.execCommand(command, false, value);
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


                };

                $scope.editLink = function($event) {
                    document.execCommand('createLink', null, "LINK_TO_BE_ADDED");
                    var editLinkModal = $modal.open({
                        templateUrl: 'views/directives/content_editor_link.html',
                        controller: 'ContentEditorLinkModalController',
                    });

                    editLinkModal.result.then(function(link) {
                        $scope.model.$setViewValue($scope.model.$viewValue.replace('LINK_TO_BE_ADDED', link));
                        $scope.model.$render();
                        $timeout(function() {
                            $scope.element.focus();
                        });
                    }, function() {
                        $scope.model.$setViewValue($scope.model.$viewValue.replace(/<a.*href="LINK_TO_BE_ADDED".*>(.*?)<\/a>/gi, "$1"))
                        $scope.model.$render();
                        $timeout(function() {
                            $scope.element.focus();
                        });
                    })
                };


                $scope.addImage = function($event) {
                    document.execCommand('insertIMAGE', null, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
                    var addImageModal = $modal.open({
                        templateUrl: 'views/directives/content_editor_image.html',
                        controller: 'ContentEditorImageModalController',
                    });

                    addImageModal.result.then(function(image) {
                        $scope.model.$setViewValue($scope.model.$viewValue.replace('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', image));
                        $scope.model.$render();
                        $timeout(function() {
                            $scope.element.focus();
                        });
                    }, function() {
                        $scope.model.$setViewValue($scope.model.$viewValue.replace(/<img.*src="data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP\/\/\/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7".*>/gi, ""));
                        $scope.model.$render();
                        $timeout(function() {
                            $scope.element.focus();
                        });
                    })
                };

                $scope.preview = function($event) {
                    $modal.open({
                        templateUrl: 'views/directives/content_editor_preview.html',
                        controller: 'ContentEditorPreviewModalController',
                        size: 'lg',
                        resolve: {
                            content: function () {
                                return $scope.model.$viewValue;
                            }
                        }
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

app.controller('ContentEditorLinkModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
    $scope.ok = function () {
        $modalInstance.close($scope.link);
    }
}]);
app.controller('ContentEditorImageModalController', ['$scope', '$modalInstance', 'Upload', function ($scope, $modalInstance, Upload) {
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: '/image_upload',
            file: file
        }).success(function (data, status, headers, config) {
            $scope.link = data;
            $scope.ok();
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };

    $scope.ok = function () {
        $modalInstance.close($scope.link);
    }
}]);


app.controller('ContentEditorPreviewModalController', ['$scope', '$modalInstance', 'content', function ($scope, $modalInstance, content) {
    // Set initial values
    $scope.content = content;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);
