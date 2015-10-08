var app = angular.module('app');

app.controller('EditQuestionController', ['$scope', '$rootScope', '$modal', '$routeParams', '$location', 'questionService', function ($scope, $rootScope, $modal, $routeParams, $location, questionService) {
    // Set initial values
    $scope.loading = false;
    $scope.loadingUsers = false;
    $scope.saving = false;
    $scope.deleting = false;
    $scope.data = {};
    $scope.data.type = "choice";


    $rootScope.title = "Edit Question";

    $scope.cancel = function() {
        var exitModal = $modal.open({
            templateUrl: "views/question_edit_exit.html",
            controller: "DefaultModalController"
        });

        exitModal.result.then(function() {
            $location.path('/question/');
            $location.search("");
        })
    };

    $scope.save = function () {
        $scope.saving = true;
        var promise;
        if (angular.isUndefined($scope.data.id)) {
            promise = questionService.addQuestion($scope.data);
            promise = promise.success(function(data) {
                $location.path("/question/" + data.id + "/edit").replace();
                $location.search("");
            })
        } else {
            promise = questionService.saveQuestion($scope.data)
        }
        promise
            .success(function (data) {
                $scope.saving = false;
                $scope.data  = data;
            })
            .error(function (data) {
                $scope.saving = false;
            });
    };

    $scope.delete = function() {
        var deleteQuestionModal = $modal.open({
            templateUrl: "views/question_edit_delete.html",
            controller: "DefaultModalController"
        });

        deleteQuestionModal.result.then(function() {
            $scope.deleting = true;
            questionService.deleteQuestion($scope.data)
                .success(function() {
                    $location.path('/question/')
                })
                .error(function() {
                    $scope.deleting = false;
                })
        });

    };

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            $scope.loading = true;

            // If copy if present we delete the id and make a new question
            if(angular.isDefined($routeParams.copy)) {
                questionService.getQuestion($routeParams.id)
                    .success(function (data) {
                        delete data["id"];
                        $scope.data = data;
                        $scope.loading = false;
                    })
                    .error(function (data) {
                        $scope.loading = false;
                    });
            } else {
                questionService.getQuestion($routeParams.id)
                    .success(function (data) {
                        $scope.data = data;
                        $scope.loading = false;
                    })
                    .error(function (data) {
                        $scope.loading = false;
                    });
            }
        } else {
            var stopWatch = $rootScope.$watch('user', function(user) {
                if(angular.isDefined(user)) {
                    $scope.data.owners = [$rootScope.user.id];
                    stopWatch();
                }

            });
        }
    };

    $scope.init();

}]);