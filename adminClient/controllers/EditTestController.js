var app = angular.module('app');

app.controller('EditTestController', ['$scope', '$modal', '$location', '$routeParams', 'testService', function ($scope, $modal, $location, $routeParams, testService) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.deleting = false;
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
                $location.path('/test/');
            });
    }

    $scope.save = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($scope.data.id)) {
            promise = testService.addTest($scope.data);
            promise = promise.success(function(data) {
                $location.path("/test/" + data.id + "/edit").replace();
            })
        } else {
            promise = testService.saveTest($scope.data)
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
        $location.path('/test/');
        $location.search("");
    };

    $scope.delete = function() {
        $scope.deleting = true;
        var deleteTestModal = $modal.open({
            templateUrl: "views/test_edit_delete_test.html",
            controller: "DefaultModalController"
        });

        deleteTestModal.result.then(function() {
            testService.deleteTest($scope.data.id)
                .success(function() {
                    $location.path('/test/');
                });
        }, function() {
            $scope.deleting = false;
        });
    };

}]);