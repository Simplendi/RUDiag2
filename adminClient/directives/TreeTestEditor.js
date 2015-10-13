var app = angular.module('app');

app.directive('treeTestEditor', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                openTestHandler: '&',
                closeTestHandler: '&'
            },
            templateUrl: 'views/directives/tree_test_editor.html',
            controller: ['$scope', '$rootScope', '$modal', 'moment', 'userService', function ($scope, $rootScope, $modal, moment, userService) {

                $scope.now = moment.utc();

                $scope.users = [];
                $scope.loadingUsers = false;
                $scope.newOwner = {};
                $scope.newReviewer = {};

                $scope.init = function () {
                    $scope.loadingUsers = true;
                    userService.listUser()
                        .success(function (data) {
                            $scope.loadingUsers = false;
                            $scope.users = data;
                        });
                };

                $scope.$watch('data', function() {
                    $scope.editElement = null;
                });

                $scope.addChild = function() {
                    if(angular.isUndefined($scope.editElement.children)) {
                        $scope.editElement.children = [];
                    }

                    if(angular.isUndefined($scope.editElement.child_labels)) {
                        $scope.editElement.child_labels = [];
                    }

                    $scope.editElement.child_labels.push("More information");

                    $scope.editElement.children.push([]);
                };

                $scope.deleteChild = function($index) {
                    $scope.editElement.child_labels.splice($index, 1);
                    $scope.editElement.children.splice($index, 1);
                };

                $scope.onEditElement = function(element) {
                    $scope.editElement = element;
                };

                $scope.isEditElement = function(element) {
                    return $scope.editElement == element;
                };


                $scope.getUserById = function (user_id) {
                    for (var user_index = 0; user_index < $scope.users.length; user_index++) {
                        var user = $scope.users[user_index];
                        if (user.id == user_id) {
                            return user
                        }
                    }
                    return undefined;
                };

                $scope.canRemoveOwner = function (user_id) {
                    return $rootScope.user.id != user_id;
                };

                $scope.addOwner = function () {
                    if (angular.isUndefined($scope.data.owners)) {
                        $scope.data.owners = [];
                    }
                    if (!angular.isUndefined($scope.newOwner.id) && $scope.data.owners.indexOf($scope.newOwner.id) < 0) {
                        $scope.data.owners.push($scope.newOwner.id);
                    }
                    $scope.newOwner = {};
                };

                $scope.deleteOwner = function (index) {
                    $scope.data.owners.splice(index, 1);
                };

                $scope.filterOwners = function (value, index, array) {
                    if ($scope.data.owners.indexOf(value.id) >= 0) {
                        return false;
                    } else {
                        return true;
                    }
                };

                $scope.addReviewer = function () {
                    if (angular.isUndefined($scope.data.reviewers)) {
                        $scope.data.reviewers = [];
                    }
                    if (!angular.isUndefined($scope.newReviewer.id) && $scope.data.reviewers.indexOf($scope.newReviewer.id) < 0) {
                        $scope.data.reviewers.push($scope.newReviewer.id);
                    }
                    $scope.newReviewer = {};
                };

                $scope.deleteReviewer = function (index) {
                    $scope.data.reviewers.splice(index, 1);
                };

                $scope.filterReviewers = function (value, index, array) {
                    if ($scope.data.owners.indexOf(value.id) >= 0) {
                        return false;
                    } else if (angular.isDefined($scope.data.reviewers) && $scope.data.reviewers.indexOf(value.id) >= 0) {
                        return false;
                    } else {
                        return true;
                    }
                };

                $scope.openTest = function () {
                    var openTestModal = $modal.open({
                        templateUrl: "views/directives/test_editor_open_test.html",
                        controller: "DefaultModalController"
                    });

                    openTestModal.result.then(function () {
                        $scope.openTestHandler();
                    });
                };


                $scope.closeTest = function () {
                    var closeTestModal = $modal.open({
                        templateUrl: "views/directives/test_editor_close_test.html",
                        controller: "DefaultModalController"
                    });

                    closeTestModal.result.then(function () {
                        $scope.closeTestHandler();
                    });
                };

                $scope.getStatus = function () {
                    if (!angular.isString($scope.data.opened_at)) {
                        return "planned"
                    } else if (angular.isString($scope.data.opened_at) && !angular.isString($scope.data.closed_at)) {
                        return "opened"
                    } else {
                        return "closed"
                    }
                };

                $scope.isPlanned = function () {
                    return $scope.getStatus() == "planned";
                };

                $scope.isOpened = function () {
                    return $scope.getStatus() == "opened";
                };

                $scope.isClosed = function () {
                    return $scope.getStatus() == "closed";
                };

                $scope.addExtraDataOption = function() {
                    if(angular.isUndefined($scope.data.extra_data_options)) {
                        $scope.data.extra_data_options = [];
                    }
                    $scope.data.extra_data_options.push("");
                };

                $scope.deleteExtraDataOption = function(option_index) {
                    $scope.data.extra_data_options.splice(option_index, 1);
                };

                $scope.init();


            }
            ]
        }
    }
)
;


app.directive('treeTestTree', ['RecursionHelper', function (RecursionHelper) {
    return {
        restrict: 'E',
        scope: {
            content: '=',
            depth: '=',
            path: '=',
            disabled: '=ngDisabled',
            editElementHandler: '&',
            isEditElement: '&',
        },
        templateUrl: 'views/directives/tree_test_tree.html',
        controller: ['$scope', '$rootScope', '$modal', 'moment', 'userService', function ($scope, $rootScope, $modal, moment, userService) {
            $scope.newElement = {};

            $scope.addElement = function() {
                if(angular.isUndefined($scope.content)) {
                        $scope.content = [];
                }
                if($scope.newElement.element == 'text') {
                    $scope.addTextElement();
                } else if ($scope.newElement.element == 'question') {
                    $scope.addQuestionElement();
                } else if ($scope.newElement.element == 'existing_question') {
                    $scope.addExistingQuestionElement();
                } else if ($scope.newElement.element == 'route') {
                    $scope.addRouteQuestionElement();
                }
            };

            $scope.addTextElement = function () {
                $scope.content.push({type: 'text', data: '', title: "Element title"})
            };

            $scope.addQuestionElement = function () {
                $scope.content.push({type: 'question', data: {}, minAnswers:1, maxAnswers:1, title: "Element title"})
            };

            $scope.addExistingQuestionElement = function() {
                var selectQuestionElementModal = $modal.open({
                    templateUrl: "views/directives/test_editor_select_question.html",
                    controller: "TestEditorSelectQuestionController",
                    size: "lg"
                });

                selectQuestionElementModal.result.then(function (question_data) {
                    $scope.content.push({type: 'question', data: question_data, minAnswers:1, maxAnswers:1, title: "Element title"})
                })
            };

            $scope.addRouteQuestionElement = function() {
                $scope.content.push({type: 'route', data: {}, children: [], title: "Element title"});
            };

            $scope.onEditElement = function(element) {
                $scope.editElementHandler()(element);
            };

            $scope.deleteElement = function ($index) {

                var deleteElementModal = $modal.open({
                    templateUrl: "views/directives/tree_test_editor_delete.html",
                    controller: "DefaultModalController"
                });

                deleteElementModal.result.then(function () {

                    $scope.content.splice($index, 1);
                });
            };

            $scope.moveElementUp = function ($index) {
                var oldIndex = $index;
                var newIndex = $index - 1;

                $scope.moveElement(oldIndex, newIndex);
            };

            $scope.moveElementDown = function ($index) {
                var oldIndex = $index;
                var newIndex = $index + 1;

                $scope.moveElement(oldIndex, newIndex);
            };

            $scope.moveElement = function (oldIndex, newIndex) {
                var element = $scope.content[oldIndex];

                $scope.content.splice(oldIndex, 1);
                $scope.content.splice(newIndex, 0, element);
            };

            $scope.getPath = function(element) {
                return ($scope.path || '') + ($scope.content.indexOf(element)+1).toString() + "."
            }
        }],
        compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element);
        }
    }
}]);