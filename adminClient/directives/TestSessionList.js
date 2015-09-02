var app = angular.module('app');

app.directive('testSessionList', function () {
    return {
        restrict: 'E',
        scope: {
            test: '=',
        },
        templateUrl: 'views/directives/test_session_list.html',
        controller: ['$scope', '$rootScope', '$modal', 'moment', 'testSessionService', function ($scope, $rootScope, $modal, moment, testSessionService) {
            $scope.test_sessions = [];
            $scope.loading = true;

            $scope.loadTestSessions = function() {
                testSessionService.listTestSession($scope.test.id).
                    success(function(data) {
                        $scope.test_sessions = data;
                        $scope.loading = false;
                    })
            };

            $scope.init = function() {
            };

            $scope.$watch('test.id', function(newValue) {
                if(angular.isDefined(newValue)) {
                    $scope.loadTestSessions(newValue);
                }
            });

            $scope.edit = function($index) {
                var test_session = $scope.test_sessions[$index];
                var editModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_edit_data.html",
                    controller: "TestSessionListEditDataController",
                    size: "lg",
                    resolve: {
                        testSession: function() {
                            return test_session;
                        }
                    }
                });

                editModal.result.then(function (test_session) {
                    testSessionService.saveTestSession(test_session);
                });
            };

            $scope.delete = function($index) {
                var deleteModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_delete.html",
                    controller: "DefaultModalController"
                });

                deleteModal.result.then(function() {
                    testSessionService.deleteTestSession($scope.test_sessions[$index])
                    .success(function() {
                        $scope.loadTestSessions();
                    })
                })
            };

            $scope.review = function($index) {
                var test_session = $scope.test_sessions[$index];
                var reviewModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_review.html",
                    controller: "TestSessionListReviewController",
                    size: "lg",
                    resolve: {
                        testSession: function() {
                            return test_session;
                        },
                        test: function() {
                            return $scope.test;
                        }
                    }
                });

                reviewModal.result.then(function (test_session) {
                    test_session.reviewed_at = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
                    testSessionService.saveTestSession(test_session);
                });
            };

            $scope.add = function() {
                var editModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_edit_data.html",
                    controller: "TestSessionListEditDataController",
                    size: "lg",
                    resolve: {
                        testSession: function() {
                            return {};
                        }
                    }
                });

                editModal.result.then(function (test_session) {
                    test_session.test_id = $scope.test.id;
                    testSessionService.addTestSession(test_session)
                        .success(function() {
                            $scope.loadTestSessions();
                        })
                });
            };

            $scope.getTestSessionStatus = function(test_session) {
                if(test_session.feedback_at != null) {
                    return "feedback send"
                } else if(test_session.reviewed_at != null) {
                    return "reviewed"
                } else if(test_session.closed_at != null) {
                    return "answered"
                } else if(test_session.opened_at != null) {
                    return "answering"
                } else if(test_session.invited_at != null) {
                    return "invited"
                } else {
                    return "planned"
                }
            }

            $scope.init();
        }]
    }
});
