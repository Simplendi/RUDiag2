var app = angular.module('app');

app.controller('ListUserController', ['$scope', 'userService', function($scope, userService) {
    // Set initial values
    $scope.loading = true;
    $scope.filter = {};
    $scope.users = [];

    // Function to load users
    $scope.loadUsers = function() {
        userService.listUser($scope.filter)
            .success(function(users) {
                $scope.users = users;
            });
    };


    // Load the users now
    $scope.loadUsers();

}]);