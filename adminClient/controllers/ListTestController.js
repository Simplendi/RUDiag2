var app = angular.module('app');

app.controller('ListTestController', ['$scope', '$modal', 'testService', function($scope, $modal, testService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.tests = [];

    // Function to load tests
    $scope.loadTests = function() {
        testService.listTest($scope.filter)
            .success(function(tests) {
                $scope.tests = tests;
            });
    };

    // Load the tests now
    $scope.loadTests();

}]);
