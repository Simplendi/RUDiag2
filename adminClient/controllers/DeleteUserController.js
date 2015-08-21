var app = angular.module('app');

app.controller('DeleteUserController', ['$scope', '$routeParams', '$location', 'userService', function ($scope, $routeParams, $location, userService) {
    // Set initial values
    $scope.loading = false;
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
