var app = angular.module('app');

app.controller('EditUserController', ['$scope', '$routeParams', '$location', 'userService', function ($scope, $routeParams, $location, userService) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.deleting = false;
    $scope.data = {};

    if (angular.isDefined($routeParams.id)) {
        $scope.loading = true;


        userService.getUser($routeParams.id)
            .success(function (data) {
                $scope.data = data;
                $scope.loading = false;
            })
            .error(function (data) {
                $scope.loading = false;
            });
    }

    $scope.cancel = function() {
        $location.path('/user/');
        $location.search("");
    };

    $scope.save = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($scope.data.id)) {
            promise = userService.addUser($scope.data);
            promise = promise.success(function (data) {
                $location.path("/user/" + data.id + "/edit").replace();
                $location.search("");
            })
        } else {
            promise = userService.saveUser($scope.data)
        }
        promise
            .success(function (data) {
                $scope.saving = false;
                $scope.data.id = data.id;
                $scope.data.password = "";
            })
            .error(function (data) {
                $scope.saving = false;
            });
    };

    $scope.delete = function () {
        $scope.deleting = true;
        userService.deleteUser($scope.data)
            .success(function () {
                $location.path('/user/');
                $location.search("");
            })
            .error(function () {
                $scope.deleting = false;
            })
    };

}]);
