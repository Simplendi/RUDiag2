var app = angular.module('app');

app.controller('AccessController', ['$scope', '$routeParams',  '$location', 'runTestService', function($scope, $routeParams, $location, runTestService) {
    $scope.state = "loading";
    $scope.test = {};
    $scope.inviteData = {};

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            $scope.state = "loading";
            runTestService.getTestInfo($routeParams.id)
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

    $scope.openTest = function() {
        if($scope.test.invite_method == 'link' || $scope.test.invite_method == 'secure') {
            $location.path("/answer/" + $scope.inviteData.code).replace()
        }
    };

    $scope.init();

}]);