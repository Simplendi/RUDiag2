var app = angular.module('app');

app.controller('LoginController', ['$scope', '$rootScope', '$location', 'loginService', function($scope, $rootScope, $location, loginService) {
    $scope.onLoginClick = function() {
        loginService.doLogin($scope.username, $scope.password)
            .success(function(data) {
                // Redirect back to home page
                $location.url('/');
                $rootScope.user = data;
                $scope.error = "";
            })
            .error(function(data, status) {
                if(status==401) {
                    $scope.error = "Wrong username or password. Please try again or contact the administrator";
                } else {
                    $scope.error = "Unknown error. Please try again later or contact the administrator";
                }
            })
    }
}]);

