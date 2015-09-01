var app = angular.module('app');

app.controller('TestController', ['$scope', '$routeParams', 'runTestService', function($scope, $routeParams, runTestService) {
    $scope.loading = true;
    $scope.saving = false;
    $scope.test = {};
    $scope.test_session = {};

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            runTestService.getTestSession($routeParams.id)
                .success(function (session) {
                    $scope.test_session = session;
                    runTestService.getTest($scope.test_session.test_id)
                        .success(function(test) {
                            $scope.test = test;
                            $scope.loading = false;
                        })

                })
        }
    };

    $scope.contentToQuestionIndex = function (index) {
        var question_index = -1;
        for (var content_index = 0; content_index <= index && content_index < $scope.test.content.length; content_index++) {
            if ($scope.test.content[content_index].type == 'question') {
                question_index++;
            }
            if (content_index == index) {
                return question_index;
            }
        }
        return -1;
    };

    $scope.questionToContentIndex = function (index) {
        var question_index = -1;
        for (var content_index = 0; content_index < $scope.test.content.length; content_index++) {
            if ($scope.test.content[content_index].type == 'question') {
                question_index++;
            }
            if (question_index == index) {
                return content_index;
            }
        }
        return -1;
    };

    $scope.$watchCollection('test_session.answers', function() {
        runTestService.updateTestSession($routeParams.id, $scope.test_session)
            .success(function(test_session) {
                $scope.test_session.updated_at = test_session.updated_at;
            })
    });

    $scope.init();

}]);