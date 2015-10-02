var app = angular.module('app');

app.controller('HomeController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $rootScope.title = "Home";

}]);