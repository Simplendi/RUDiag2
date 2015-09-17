var app = angular.module('app');

app.controller('TestController', ['$scope', '$routeParams', '$interval', '$modal', 'runTestService', 'moment', function ($scope, $routeParams, $interval, $modal, runTestService, moment) {
    $scope.saving = false;
    $scope.test = {};
    $scope.testSession = {};

    // Variables for tree test only
    $scope.openElement = {};
    $scope.openAnswer = {};
    $scope.openPath = "";

    // The state indicates what state the controller has. There are multiple states:
    // loading: the test is loading
    // data: enter personal data requested
    // answer: answer the questions
    // done: test is answered
    // error: an unrecoverable error occurred.
    $scope.state = 'loading';


    var updateTimer;

    $scope.init = function () {
        if (angular.isDefined($routeParams.id)) {
            runTestService.getTestSession($routeParams.id)
                .success(function (session) {
                    $scope.testSession = session;
                    runTestService.getTestUsingSession($routeParams.id)
                        .success(function (test) {
                            $scope.test = test;
                            if ($scope.testSession.feedback_at != null) {
                                $scope.state = 'feedback';
                                if ($scope.test.type == 'tree') {
                                    $scope.initTree();
                                }

                            }
                            else if ($scope.testSession.closed_at != null) {
                                $scope.state = 'done';
                            } else {
                                $scope.state = 'data';
                                if ($scope.test.type == 'tree') {
                                    $scope.initTree();
                                }
                            }
                        })

                })
        }

        updateTimer = $interval($scope.onAutoupdate, 100000);
    };

    $scope.onAutoupdate = function () {
        if ($scope.testSession.closed_at == null) {
            $scope.update();
        } else {
            $scope.stopAutoupdate();
        }
    };

    $scope.update = function () {
        runTestService.updateTestSession($routeParams.id, $scope.testSession)
            .success(function (testSession) {
                $scope.testSession.updated_at = testSession.updated_at;
            })
    };

    $scope.$on('$destroy', function () {
        $scope.stopAutoupdate();
    });

    $scope.stopAutoupdate = function () {
        if (angular.isDefined(updateTimer)) {
            $interval.cancel(updateTimer);
            updateTimer = undefined;
        }
    };

    $scope.dataDone = function () {
        $scope.state = 'answer';
        $scope.update();
    };

    $scope.submit = function () {
        var submitModal = $modal.open({
            templateUrl: "views/test_submit.html",
            controller: "DefaultModalController"
        });

        submitModal.result.then(function () {
            $scope.stopAutoupdate();
            runTestService.closeTestSession($routeParams.id, $scope.testSession)
                .success(function () {
                    $scope.state = 'done';
                })
        });

    };

    // Functions for tree test only
    $scope.isElementVisited = function (path) {
        if ($scope.testSession["answers"]["visited"].hasOwnProperty(path)) {
            return $scope.testSession["answers"]["visited"][path];
        } else {
            return false;
        }
    };

    $scope.getElementByPath = function (path) {
        var path_elements = path.split(".");
        var current_array = $scope.test.content;
        for (var path_elements_index = 0; path_elements_index < path_elements.length; path_elements_index++) {
            var path_element_str = path_elements[path_elements_index];
            var element_index = parseInt(path_element_str) - 1;

            if (current_array.length > element_index) {
                if (path_elements_index == path_elements.length - 1) {
                    return current_array[element_index];
                } else {
                    path_elements_index += 1;
                    path_element_str = path_elements[path_elements_index];
                    var option_index = parseInt(path_element_str) - 1;

                    current_array = current_array[element_index]["children"][option_index];

                }
            } else {
                return null;
            }

        }
    };

    $scope.getNextPath = function (path) {
        var path_elements = path.split(".");
        path_elements[path_elements.length - 1] = (parseInt(path_elements[path_elements.length - 1]) + 1).toString();
        return path_elements.join(".");
    };

    $scope.getUpPath = function (path) {
        var path_elements = path.split(".");
        path_elements.pop();
        path_elements.pop();
        return path_elements.join(".");
    };

    $scope.openElementByPath = function (path) {
        var element = $scope.getElementByPath(path);
        $scope.openElementHandler(element, path);
    };

    $scope.hasNextElement = function () {
        var element = $scope.getElementByPath($scope.getNextPath($scope.openPath));
        return element != null;
    };

    $scope.hasAnswerElement = function() {
        if(!angular.isNumber($scope.openAnswer.answer)) {
            return false;
        }

        var element = $scope.getElementByPath($scope.openPath + "." + ($scope.openAnswer.answer+1).toString() + ".1");
        return element != null;
    }

    $scope.hasUpElement = function () {
        var element = $scope.getElementByPath($scope.getUpPath($scope.openPath));
        return element != null;
    };

    $scope.openNextElement = function () {
        var element = $scope.getElementByPath($scope.getNextPath($scope.openPath));
        $scope.openElementHandler(element, $scope.getNextPath($scope.openPath));
    };

    $scope.openUpElement = function () {
        var element = $scope.getElementByPath($scope.getUpPath($scope.openPath));
        $scope.openElementHandler(element, $scope.getUpPath($scope.openPath));
    };

    $scope.openAnswerElement = function() {
        var answerIndex = $scope.openAnswer.answer;
        var element = $scope.getElementByPath($scope.openPath + "." + (answerIndex+1).toString() + ".1");
        $scope.answerQuestion();
        $scope.openElementHandler(element, $scope.openPath + "." + (answerIndex+1).toString() + ".1");
    };

    $scope.openElementHandler = function (element, path) {
        if (!angular.isObject($scope.testSession["answers"]) || angular.isUndefined($scope.testSession["answers"]["visited"])) {
            $scope.testSession["answers"] = {'answers': {}, 'visited': {}}
        }

        $scope.openElement = element;
        $scope.openPath = path;
        $scope.openAnswer = {};
        if(!$scope.testSession["answers"]["visited"].hasOwnProperty(path) || !$scope.testSession["answers"]["visited"][path]) {
            $scope.testSession["answers"]["visited"][path] = true;
        }
    };

    $scope.isElementOpen = function (element) {
        return $scope.openElement == element;
    };

    $scope.initTree = function () {
        $scope.openElementHandler($scope.test.content[0], "1");

    };

    $scope.answerQuestion = function () {
        if (!angular.isArray($scope.testSession["answers"]["answers"][$scope.openPath])) {
            $scope.testSession["answers"]["answers"][$scope.openPath] = [];
        }
        $scope.testSession["answers"]["answers"][$scope.openPath].push(angular.copy($scope.openAnswer.answer));
        $scope.openAnswer = {};
    };

    $scope.getPreviousAnswers = function () {
        if (!angular.isArray($scope.testSession["answers"]["answers"][$scope.openPath])) {
            $scope.testSession["answers"]["answers"][$scope.openPath] = [];
        }
        return $scope.testSession["answers"]["answers"][$scope.openPath];
    };

    // Init everything

    $scope.init();

}]);