var app = angular.module('app');

app.controller('EditTestController', ['$scope', '$routeParams', 'testService', function ($scope, $routeParams, testService) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.data = {};
    $scope.data.content = [];

    if (angular.isDefined($routeParams.id)) {
        $scope.loading = true;
        testService.getTest($routeParams.id)
            .success(function (data) {
                $scope.data = data;
                $scope.loading = false;
            })
            .error(function (data) {
                $scope.loading = false;
            });
    }

    $scope.saveTest = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($scope.data.id)) {
            promise = testService.addTest($scope.data)
        } else {
            promise = testService.saveTest($scope.data)
        }
        promise
            .success(function (data) {
                $scope.saving = false;
                $scope.data.id = data.id;
            })
            .error(function (data) {
                $scope.saving = false;
            });
    }

}]);