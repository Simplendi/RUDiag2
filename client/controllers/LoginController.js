var app = angular.module('app');

app.controller('LoginController', ['$scope', '$rootScope', '$location', 'loginService', function($scope, $rootScope, $location, loginService) {
    $scope.onLoginClick = function() {
        loginService.doLogin($scope.username, $scope.password)
            .success(function(data) {
                // Redirect back to home page
                $location.url('/');
                $rootScope.user = data;
            })
            .error(function() {
                console.log("Error logging in!");
            })
    }
}]);

