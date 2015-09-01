var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.select']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
}]);


