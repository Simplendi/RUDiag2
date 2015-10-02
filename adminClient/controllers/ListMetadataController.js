var app = angular.module('app');

app.controller('ListMetadataController', ['$scope', '$rootScope', '$modal', 'metadataService', function($scope, $rootScope, $modal, metadataService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.metadatas = [];

    $rootScope.title = "List Metadata";

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

