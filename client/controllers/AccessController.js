var app = angular.module('app');

app.controller('AccessController', ['$scope', '$rootScope', '$routeParams',  '$location', 'runTestService', function($scope, $rootScope, $routeParams, $location, runTestService) {
    $scope.state = "loading";
    $scope.test = {};
    $scope.inviteData = {};

    // Indicates that the code is wrong
    $scope.codeError = false;

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            $scope.state = "loading";
            runTestService.getTestInfo($routeParams.id)
                .success(function(data) {
                    $scope.test = data;
                    if($scope.test.closed_at!=null) {
                        $scope.state = "unknown";
                        $rootScope.title = "Error";
                    } else {
                        $scope.state = "form";
                        $rootScope.title = $scope.test.title;
                    }
                })
                .error(function() {
                    $scope.state = "unknown";
                    $rootScope.title = "Error";
                });
        } else {
            $scope.state = "unknown";
            $rootScope.title = "Error";
        }
    };

    $scope.requestInvite = function() {
        if($scope.test.invite_method == 'link') {
            runTestService.requestInvite($routeParams.id, $scope.inviteData)
                .success(function() {
                    $scope.state = 'done'
                })
                .error(function() {
                    $scope.state = 'error'
                })

        }
    };

    $scope.openTest = function() {
        if($scope.test.invite_method == 'link' || $scope.test.invite_method == 'email') {
            $location.path("/answer/" + $scope.inviteData.code).replace()
        }
        else if($scope.test.invite_method == 'code' || $scope.test.invite_method == 'secure') {
            runTestService.getTestSession($scope.inviteData.code)
                .success(function() {
                $location.path("/answer/" + $scope.inviteData.code).replace();
                })
                .error(function() {
                    $scope.codeError = true;
                });
        }
    };

    $scope.init();

}]);