var app = angular.module('app');

app.controller('TestController', ['$scope', '$routeParams', '$interval', '$modal', 'runTestService', 'moment', function($scope, $routeParams, $interval, $modal, runTestService, moment) {
    $scope.saving = false;
    $scope.test = {};
    $scope.test_session = {};

    // The state indicates what state the controller has. There are multiple states:
    // loading: the test is loading
    // data: enter personal data requested
    // answer: answer the questions
    // done: test is answered
    // error: an unrecoverable error occurred.
    $scope.state = 'loading';


    var updateTimer;

    $scope.init = function() {
        if (angular.isDefined($routeParams.id)) {
            runTestService.getTestSession($routeParams.id)
                .success(function (session) {
                    $scope.test_session = session;
                    runTestService.getTestUsingSession($routeParams.id)
                        .success(function(test) {
                            $scope.test = test;
                            if($scope.test_session.closed_at != null) {
                                $scope.state = 'done';
                            } else {
                                $scope.state = 'data';
                            }
                        })

                })
        }

        updateTimer = $interval($scope.onAutoupdate, 100000);
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

    $scope.onAutoupdate = function() {
      if($scope.test_session.closed_at == null) {
          $scope.update();
      } else {
          $scope.stopAutoupdate();
      }
    };

    $scope.update = function() {
        runTestService.updateTestSession($routeParams.id, $scope.test_session)
            .success(function(test_session) {
                $scope.test_session.updated_at = test_session.updated_at;
            })
    };

    $scope.$on('$destroy', function() {
        $scope.stopAutoupdate();
    });

    $scope.stopAutoupdate = function() {
        if(angular.isDefined(updateTimer)) {
            $interval.cancel(updateTimer);
            updateTimer = undefined;
        }
    };

    $scope.dataDone = function() {
        $scope.state = 'answer';
        $scope.update();
    };

    $scope.submit = function() {
        var submitModal = $modal.open({
            templateUrl: "views/test_submit.html",
            controller: "DefaultModalController"
        });

        submitModal.result.then(function () {
            $scope.stopAutoupdate();
            runTestService.closeTestSession($routeParams.id, $scope.test_session)
                .success(function() {
                    $scope.state = 'done';
                })
        });

    };

    $scope.init();

}]);