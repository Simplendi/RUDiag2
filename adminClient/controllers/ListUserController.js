var app = angular.module('app');

app.controller('ListUserController', ['$scope', 'userService', function($scope, userService) {
    // Set initial values
    $scope.loading = true;
    $scope.search = "";
    $scope.users = [];

    // Function to load users
    $scope.loadUsers = function() {
        userService.listUser($scope.search)
            .success(function(users) {
                $scope.users = users;
            });
    };

    $scope.$watch('search', function(newValue) {
        userService.listUser(newValue)
            .success(function(users) {
                $scope.users = users;
            });
    });


    // Load the users now
    $scope.loadUsers();

}]);