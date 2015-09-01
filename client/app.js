var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html',
        })
        .when('/test/:id/:name', {
            controller: 'AccessController',
            templateUrl: 'views/access.html'
        })
        .when('/answer/:id', {
            controller: 'TestController',
            templateUrl: 'views/test.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


