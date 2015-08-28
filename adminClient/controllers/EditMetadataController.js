var app = angular.module('app');

app.controller('EditMetadataController', ['$scope', '$modal', '$location', '$routeParams', 'metadataService', function ($scope, $modal, $location, $routeParams, metadataService) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.deleting = false;
    $scope.data = {};

    if (angular.isDefined($routeParams.id)) {
        $scope.loading = true;
        metadataService.getMetadata($routeParams.id)
            .success(function (data) {
                $scope.data = data;
                $scope.loading = false;
            })
            .error(function (data) {
                $scope.loading = false;
                $location.path('/metadata/');
            });
    }

    $scope.save = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($routeParams.id)) {
            promise = metadataService.addMetadata($scope.data);
            promise = promise.success(function(data) {
                $location.path("/metadata/" + data.id + "/edit").replace();
            })
        } else {
            promise = metadataService.saveMetadata($scope.data)
        }
        promise
            .success(function (data) {
                $scope.saving = false;
                $scope.data = data;
            })
            .error(function (data) {
                $scope.saving = false;
            });
    };

    $scope.cancel = function() {
        $location.path('/metadata/')
    };

    $scope.deleteMetadata = function() {
        $scope.deleting = true;
        var deleteMetadataModal = $modal.open({
            templateUrl: "views/metadata_edit_delete_metadata.html",
            controller: "DefaultModalController"
        });

        deleteMetadataModal.result.then(function() {
            metadataService.deleteMetadata($scope.data.id)
                .success(function() {
                    $location.path('/metadata/');
                });
        }, function() {
            $scope.deleting = false;
        });
    };

}]);