var app = angular.module('app');

app.controller('AccessController', ['$scope', '$routeParams', 'runTestService', function($scope, $routeParams, runTestService) {
    $scope.state = "loading";
    $scope.test = {};
    $scope.inviteData = {};

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            $scope.state = "loading";
            runTestService.getTest($routeParams.id)
                .success(function(data) {
                    $scope.test = data;
                    $scope.state = "form"
                })
                .error(function() {
                    $scope.state = "unknown"
                });
        } else {
            $scope.state = "unknown"
        }
    };

    $scope.requestInvite = function() {
        if($scope.test.invite_method == 'link') {
            runTestService.requestInvite($routeParams.id, $scope.inviteData)
                .success(function() {
                    $scope.state = 'form'
                })
                .error(function() {
                    $scope.state = 'error'
                })

        }
    };

    $scope.init();

}]);