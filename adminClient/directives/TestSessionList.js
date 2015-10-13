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

            $scope.loadTestSessions = function () {
                testSessionService.listTestSession($scope.test.id).
                    success(function (data) {
                        $scope.test_sessions = data;
                        $scope.loading = false;
                    })
            };

            $scope.init = function () {
            };

            $scope.$watch('test.id', function (newValue) {
                if (angular.isDefined(newValue)) {
                    $scope.loadTestSessions(newValue);
                }
            });

            $scope.edit = function ($index) {
                var test_session = $scope.test_sessions[$index];
                var editModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_edit_data.html",
                    controller: "TestSessionListEditDataController",
                    size: "lg",
                    resolve: {
                        testSession: function () {
                            return test_session;
                        },
                        test: function() {
                            return $scope.test;
                        }
                    }
                });

                editModal.result.then(function (test_session) {
                    testSessionService.saveTestSession(test_session)
                        .error(function () {
                            $modal.open({
                                templateUrl: "views/error_modal.html",
                            })
                        });
                });
            };

            $scope.delete = function ($index) {
                var deleteModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_delete.html",
                    controller: "DefaultModalController"
                });

                deleteModal.result.then(function () {
                    testSessionService.deleteTestSession($scope.test_sessions[$index])
                        .success(function () {
                            $scope.loadTestSessions();
                        }).error(function () {
                            $modal.open({
                                templateUrl: "views/error_modal.html",
                            })
                        })
                })
            };

            $scope.review = function ($index) {
                var test_session = $scope.test_sessions[$index];
                var reviewModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_review.html",
                    controller: "TestSessionListReviewController",
                    size: "lg",
                    resolve: {
                        testSession: function () {
                            return test_session;
                        },
                        test: function () {
                            return $scope.test;
                        }
                    }
                });

                reviewModal.result.then(function (test_session) {
                    test_session.reviewed_at = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
                    testSessionService.saveTestSession(test_session);
                });
            };

            $scope.add = function () {
                var editModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_edit_data.html",
                    controller: "TestSessionListEditDataController",
                    size: "lg",
                    resolve: {
                        testSession: function () {
                            return {};
                        },
                        test: function() {
                            return $scope.test;
                        }
                    }
                });

                editModal.result.then(function (test_session) {
                    test_session.test_id = $scope.test.id;
                    testSessionService.addTestSession(test_session)
                        .success(function () {
                            $scope.loadTestSessions();
                        }).error(function () {
                            $modal.open({
                                templateUrl: "views/error_modal.html",
                            })
                        })
                });
            };

            $scope.getTestSessionStatus = function (test_session) {
                if (test_session.feedback_at != null) {
                    return "feedback sent"
                } else if (test_session.reviewed_at != null) {
                    return "reviewed"
                } else if (test_session.closed_at != null) {
                    return "answered"
                } else if (test_session.opened_at != null) {
                    return "answering"
                } else if (test_session.invited_at != null) {
                    return "invited"
                } else {
                    return "planned"
                }
            };

            $scope.sendInvite = function (test_session_id) {
                var sendingModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_send_invite.html",
                });
                testSessionService.sendInvite(test_session_id)
                    .success(function () {
                        sendingModal.close();
                        $scope.loadTestSessions();
                    })
                    .error(function () {
                        sendingModal.close();
                        $modal.open({
                            templateUrl: "views/error_modal.html",
                        })
                    })

            };

            $scope.sendFeedback = function (test_session_id) {
                var sendingModal = $modal.open({
                    templateUrl: "views/directives/test_session_list_send_feedback.html",
                });
                testSessionService.sendFeedback(test_session_id)
                    .success(function () {
                        sendingModal.close();
                        $scope.loadTestSessions();
                    })
                    .error(function () {
                        sendingModal.close();
                        $modal.open({
                            templateUrl: "views/error_modal.html",
                        })
                    })

            };

            $scope.import = function() {
                var importModal = $modal.open({
                    controller: "TestSessionListImportController",
                    templateUrl: 'views/directives/test_session_list_import.html',
                    resolve: {
                        test_id: function() {
                            return $scope.test.id;
                        }
                    }
                });

                importModal.result.then(function() {
                    $scope.loadTestSessions();
                }, function() {

                })
            };

            $scope.isOwner = function() {
                if (angular.isDefined($scope.test)&&angular.isDefined($scope.test.owners)) {
                    return $scope.test.owners.indexOf($rootScope.user.id) >= 0;
                } else {
                    return false;
                }
            };

            $scope.init();
        }]
    }
});

app.controller('TestSessionListImportController', ['$scope', '$modalInstance', 'Upload', 'test_id', function ($scope, $modalInstance, Upload, test_id) {
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: '/test_session/' + test_id +'/import',
            file: file
        }).success(function (data, status, headers, config) {
            $scope.ok();
        }).error(function (data, status, headers, config) {
            $scope.cancel();
        })
    };

    $scope.ok = function () {
        $modalInstance.close();
    }
}]);

