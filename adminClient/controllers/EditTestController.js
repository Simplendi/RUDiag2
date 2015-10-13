var app = angular.module('app');

app.controller('EditTestController', ['$scope', '$rootScope', '$modal', '$location', '$routeParams', 'testService', 'moment', 'is_tree', function ($scope, $rootScope, $modal, $location, $routeParams, testService, moment, is_tree) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.deleting = false;
    $scope.data = {};
    $scope.data.content = [];

    $rootScope.title = "Edit Test";


    $scope.save = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($scope.data.id)) {
            promise = testService.addTest($scope.data);
            promise = promise.success(function(data) {
                $location.path("/test/" + data.id + "/edit").replace();
                $location.search("");
            })
        } else {
            promise = testService.saveTest($scope.data)
        }
        promise
            .success(function (data) {
                $scope.saving = false;
                $scope.data = data;
            })
            .error(function (data) {
                $scope.saving = false;
            });
    };

    $scope.cancel = function() {
        var exitModal = $modal.open({
            templateUrl: "views/test_edit_exit.html",
            controller: "DefaultModalController"
        });

        exitModal.result.then(function() {
            $location.path('/test/');
            $location.search("");
        })
    };

    $scope.open = function() {
        $scope.data.opened_at = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
        $scope.save();

    };

    $scope.close = function() {
        $scope.data.closed_at = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
        $scope.save();
    };

    $scope.delete = function() {
        $scope.deleting = true;
        var deleteTestModal = $modal.open({
            templateUrl: "views/test_edit_delete.html",
            controller: "DefaultModalController"
        });

        deleteTestModal.result.then(function() {
            testService.deleteTest($scope.data.id)
                .success(function() {
                    $location.path('/test/');
                });
        }, function() {
            $scope.deleting = false;
        });
    };

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            $scope.loading = true;

            // If copy if present we delete the id and make a new test
            if(angular.isDefined($routeParams.copy)) {
                testService.getTest($routeParams.id)
                    .success(function (data) {
                        delete data["id"];
                        $scope.data = data;
                        $scope.data.opened_at = null;
                        $scope.data.closed_at = null;
                        $scope.data.last_saved = null;
                        $scope.data.created = null;

                        $scope.loading = false;
                    })
                    .error(function (data) {
                        $scope.loading = false;
                    });
            } else {
                testService.getTest($routeParams.id)
                    .success(function (data) {
                        $scope.data = data;
                        $scope.loading = false;
                    })
                    .error(function (data) {
                        $scope.loading = false;
                    });
            }
        } else {
            if(is_tree) {
                $scope.data.type = 'tree';
            } else {
                $scope.data.type = 'basic';
            }
            var stopWatch = $rootScope.$watch('user', function(user) {
                if(angular.isDefined(user)) {
                    $scope.data.owners = [$rootScope.user.id];
                    stopWatch();
                }

            });
            $scope.data.title = "Test title";
            $scope.data.open_at = moment().utc().add(1, 'year');
            $scope.data.close_at = moment().utc().add(1, 'year')
        }
    };

    $scope.init();

}]);