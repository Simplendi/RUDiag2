var app = angular.module('app');

app.controller('ListTestController', ['$scope', '$rootScope', '$modal', 'testService', function($scope, $rootScope, $modal, testService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.tests = [];

    $rootScope.title = "List Tests";


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

