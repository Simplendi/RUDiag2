var app = angular.module('app');

app.controller('ListMetadataController', ['$scope', '$modal', 'metadataService', function($scope, $modal, metadataService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.metadatas = [];

    // Function to load tests
    $scope.loadMetadata = function() {
        metadataService.listMetadata($scope.filter)
            .success(function(metadata) {
                $scope.metadatas = metadata;
            });
    };

    // Load the tests now
    $scope.loadMetadata();

}]);

