var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

var auth_is_user = function(user) {
    return user;
}

var auth_is_admin = function(user) {
    return user.is_admin;
}

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html',
            auth: auth_is_user
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })
        .when('/logout', {
            controller: 'LogOutController',
            templateUrl: 'views/logout.html',
            auth: auth_is_user
        })
        .when('/test/', {
            controller: 'ListTestController',
            templateUrl: 'views/test_list.html',
            auth: auth_is_user
        })
        .when('/test/add', {
            controller: 'EditTestController',
            templateUrl: 'views/test_edit.html',
            auth: auth_is_user
        })
        .when('/test/:id/edit', {
            controller: 'EditTestController',
            templateUrl: 'views/test_edit.html',
            auth: auth_is_user
        })
        .when('/question/', {
            controller: 'ListQuestionController',
            templateUrl: 'views/question_list.html',
            auth: auth_is_user
        })
        .when('/question/add', {
            controller: 'EditQuestionController',
            templateUrl: 'views/question_edit.html',
            auth: auth_is_user
        })
        .when('/question/:id/edit', {
            controller: 'EditQuestionController',
            templateUrl: 'views/question_edit.html',
            auth: auth_is_user
        })
        .when('/user/', {
            controller: 'ListUserController',
            templateUrl: 'views/user_list.html',
            auth: auth_is_admin
        })
        .when('/user/add', {
            controller: 'EditUserController',
            templateUrl: 'views/user_edit.html',
            auth: auth_is_admin
        })
        .when('/user/:id/edit', {
            controller: 'EditUserController',
            templateUrl: 'views/user_edit.html',
            auth: auth_is_admin
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {
    $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        if (next.$$route) {
            var user = $rootScope.user;
            var auth = next.$$route.auth;
            if (angular.isUndefined(user)) {
                $rootScope.loadingLoginStatus = true;
                loginService.getLoginStatus()
                    .success(function (data) {
                        $rootScope.user = user = data;
                        $rootScope.loadingLoginStatus = false;

                        if (!user) {
                            $location.path('/login')
                        }
                    })
                    .error(function () {
                        $location.path('/login');
                    })
            }
            else {
                if (auth && !auth(user)) {
                    $location.path('/login')
                }
            }
        }
    });
}]);


