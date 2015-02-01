var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html',
            auth: function(user) {
                return user;
            }
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })
        .when('/logout', {
            controller: 'LogOutController',
            templateUrl: 'views/logout.html',
            auth: function(user) {
                return user;
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        if (next.$$route) {
            var user = $rootScope.user;
            var auth = next.$$route.auth;
            if (auth && !auth(user)) {
                $location.path('/login')
            }
        }
    });
});


