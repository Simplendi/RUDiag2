var app = angular.module('app');

app.controller('EditQuestionController', ['$scope', '$routeParams', '$location', 'questionService', function ($scope, $routeParams, $location, questionService) {
    // Set initial values
    $scope.loading = false;
    $scope.saving = false;
    $scope.deleting = false;
    $scope.data = {};
    $scope.data.type = "choice";

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
    }

    $scope.saveQuestion = function () {
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
                $scope.data.id = data.id;
            })
            .error(function (data) {
                $scope.saving = false;
            });
    };

    $scope.deleteQuestion = function() {
        $scope.deleting = true;
        questionService.deleteQuestion($scope.data)
            .success(function() {
                $location.path('/question/')
            })
            .error(function() {
                $scope.deleting = false;
            })
    };

}]);