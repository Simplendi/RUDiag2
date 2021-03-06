var app = angular.module('app');

app.controller('LogoutController', ['$scope', '$rootScope', '$location', 'loginService', function($scope, $rootScope, $location, loginService) {
    $rootScope.title = "Logout";

    loginService.doLogout()
            .success(function(data) {
                // Redirect back to home page
                $location.url('/');
                $rootScope.user = data;
            })
}]);

