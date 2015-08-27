var app = angular.module('app');

app.controller('DeleteMetadataController', ['$scope', '$routeParams', '$location', 'metadataService', function ($scope, $routeParams, $location, metadataService) {
    // Set initial values
    $scope.loading = false;
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
            });
    }

    $scope.cancel = function() {
        $location.path('/metadata/');
        $location.search("");
    };


    $scope.delete = function () {
        $scope.deleting = true;
        metadataService.deleteMetadata($scope.data.id)
            .success(function () {
                $location.path('/metadata/');
                $location.search("");
            })
            .error(function () {
                $scope.deleting = false;
            })
    };

}]);
