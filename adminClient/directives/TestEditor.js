var app = angular.module('app');

app.directive('testEditor', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                openTestHandler: '&',
                closeTestHandler: '&'
            },
            templateUrl: 'views/directives/test_editor.html',
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

                $scope.addTextElement = function () {
                    $scope.data.content.push({type: 'text', data: ''})
                };

                $scope.addQuestionElement = function (question_data) {
                    $scope.data.content.push({type: 'question', 'data': question_data});
                    if (angular.isUndefined($scope.data.question_feedback)) {
                        $scope.data.question_feedback = [];
                    }
                    $scope.data.question_feedback.push({'wrong': '', 'right': ''});
                    $scope.ensureValidFeedbackRange();
                };

                $scope.addNewQuestionElement = function () {
                    $scope.addQuestionElement({'type': 'choice'});
                };

                $scope.addExistingQuestionElement = function () {
                    var selectQuestionModal = $modal.open({
                        templateUrl: "views/directives/test_editor_select_question.html",
                        controller: "TestEditorSelectQuestionController",
                        size: "lg"
                    });

                    selectQuestionModal.result.then(function (question_data) {
                        $scope.addQuestionElement(question_data);
                    });
                };

                $scope.makeQuestionLocal = function ($index) {
                    var makeQuestionLocalModal = $modal.open({
                        templateUrl: "views/directives/test_editor_make_question_local.html",
                        controller: "DefaultModalController"
                    });

                    makeQuestionLocalModal.result.then(function () {
                        delete $scope.data.content[$index].data.id;
                    });
                };

                $scope.deleteElement = function ($index) {
                    var deleteQuestionModal = $modal.open({
                        templateUrl: "views/directives/test_editor_delete_question.html",
                        controller: "DefaultModalController"
                    });

                    deleteQuestionModal.result.then(function () {
                        if ($scope.data.content[$index].type == 'question') {
                            $scope.data.question_feedback.splice($scope.contentToQuestionIndex($index), 1);
                            $scope.ensureValidFeedbackRange();
                        }
                        $scope.data.content.splice($index, 1);

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
                    var element = $scope.data.content[oldIndex];

                    var oldQuestionIndex = -1;
                    var newQuestionIndex = -1;

                    if (element.type == 'question') {
                        oldQuestionIndex = $scope.contentToQuestionIndex(oldIndex);
                    }

                    $scope.data.content.splice(oldIndex, 1);
                    $scope.data.content.splice(newIndex, 0, element);

                    if (element.type == 'question') {
                        newQuestionIndex = $scope.contentToQuestionIndex(newIndex);
                    }

                    if (oldQuestionIndex != newQuestionIndex) {
                        var question_feedback = $scope.data.question_feedback[oldQuestionIndex];
                        $scope.data.question_feedback.splice(oldQuestionIndex, 1);
                        $scope.data.question_feedback.splice(newQuestionIndex, 0, question_feedback);
                    }
                };

                $scope.addToQuestionFeedback = function (question_index, feedback_label, value) {
                    if (angular.isUndefined($scope.data.question_feedback[question_index])) {
                        $scope.data.question_feedback[question_index] = {}
                    }

                    if (angular.isUndefined($scope.data.question_feedback[question_index][feedback_label])) {
                        $scope.data.question_feedback[question_index][feedback_label] = value;
                    } else {
                        $scope.data.question_feedback[question_index][feedback_label] += value;
                    }
                };

                $scope.insertTestDefaultFeedback = function (question_index, feedback_label) {
                    $scope.addToQuestionFeedback(question_index, feedback_label, $scope.data.default_feedback[feedback_label]);
                };

                $scope.insertQuestionDefaultFeedback = function (question_index, feedback_label) {
                    $scope.addToQuestionFeedback(question_index, feedback_label, $scope.data.content[$scope.questionToContentIndex(question_index)].data.feedback[feedback_label]);
                };

                $scope.contentToQuestionIndex = function (index) {
                    var question_index = -1;
                    for (var content_index = 0; content_index <= index && content_index < $scope.data.content.length; content_index++) {
                        if ($scope.data.content[content_index].type == 'question') {
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
                    for (var content_index = 0; content_index < $scope.data.content.length; content_index++) {
                        if ($scope.data.content[content_index].type == 'question') {
                            question_index++;
                        }
                        if (question_index == index) {
                            return content_index;
                        }
                    }
                    return -1;
                };

                $scope.addTotalFeedback = function () {
                    if (angular.isUndefined($scope.data.total_feedback)) {
                        $scope.data.total_feedback = [];
                    }

                    $scope.data.total_feedback.push({"min": 0, "max": 0, "feedback": ""});
                    $scope.ensureValidFeedbackRange();
                };

                $scope.removeTotalFeedback = function ($index) {
                    $scope.data.total_feedback.splice($index, 1);
                    $scope.ensureValidFeedbackRange();
                };

                $scope.onTotalFeedbackRangeChange = function ($index, is_min) {
                    if (is_min) {
                        $scope.data.total_feedback[$index]["min"] = parseInt($scope.data.total_feedback[$index]["min"]);
                    } else {
                        $scope.data.total_feedback[$index]["max"] = parseInt($scope.data.total_feedback[$index]["max"]);
                    }
                    $scope.ensureValidFeedbackRange();
                };

                $scope.ensureValidFeedbackRange = function () {
                    if (angular.isUndefined($scope.data.total_feedback)) {
                        $scope.data.total_feedback = [];
                    }
                    while ($scope.data.total_feedback.length > $scope.data.question_feedback.length + 1) {
                        $scope.data.total_feedback.pop();
                    }
                    for (var feedback_index = 0; feedback_index < $scope.data.total_feedback.length; feedback_index++) {
                        if ($scope.getTotalFeedbackRange(feedback_index, true).indexOf($scope.data.total_feedback[feedback_index]["min"]) < 0) {
                            $scope.data.total_feedback[feedback_index]["min"] = $scope.getTotalFeedbackRange(feedback_index, true)[0];
                        } else {
                            if (feedback_index > 0) {
                                $scope.data.total_feedback[feedback_index - 1]["max"] = $scope.data.total_feedback[feedback_index]["min"] - 1;
                            }
                        }
                        if ($scope.getTotalFeedbackRange(feedback_index, false).indexOf($scope.data.total_feedback[feedback_index]["max"]) < 0) {
                            $scope.data.total_feedback[feedback_index]["max"] = $scope.getTotalFeedbackRange(feedback_index, false)[0];
                        } else {
                            if (feedback_index < $scope.data.total_feedback.length - 1) {
                                $scope.data.total_feedback[feedback_index + 1]["min"] = $scope.data.total_feedback[feedback_index]["max"] + 1;
                            }
                        }
                    }
                };

                $scope.getTotalFeedbackRange = function ($index, is_min) {
                    if (is_min) {
                        if ($index == 0) {
                            return [0];
                        } else {
                            return $scope.integerRange(Math.max($index, $scope.data.total_feedback[$index - 1]["max"] + 1), $index + $scope.data.question_feedback.length + 1 - $scope.data.total_feedback.length);
                        }
                    }
                    else {
                        if ($index == $scope.data.total_feedback.length - 1) {
                            return [$scope.data.question_feedback.length]
                        }
                        return $scope.integerRange(Math.max($index, $scope.data.total_feedback[$index]["min"]), $index + $scope.data.question_feedback.length + 1 - $scope.data.total_feedback.length);
                    }
                };

                $scope.integerRange = function (start, stop) {
                    var range = [];
                    for (var int = start; int <= stop; int++) {
                        range.push(int);
                    }

                    return range;
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

                $scope.isOwner = function() {
                    if (angular.isDefined($scope.data)&&angular.isDefined($scope.data.owners)) {
                        return $scope.data.owners.indexOf($rootScope.user.id) >= 0;
                    } else {
                        return false;
                    }
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

app.controller('TestEditorSelectQuestionController', ['$scope', '$rootScope', '$modalInstance', 'questionService', 'metadataService', function ($scope, $rootScope, $modalInstance, questionService, metadataService) {
    // Set initial values
    $scope.loading = true;
    $scope.loadingFilter = true;
    $scope.filter = $rootScope.questionFilter || {};
    $scope.questions = [];
    $scope.metadata = [];

    // Variable to track metadata to add to filter
    $scope.newMetadata = {};

    // Function to load questions
    $scope.loadQuestions = function() {
        questionService.listQuestion($scope.filter)
            .success(function(questions) {
                $scope.questions = questions;
                $scope.loading = false;
            });
    };

    $scope.loadMetadata = function() {
        metadataService.listMetadata()
            .success(function(metadata) {
                $scope.metadata = metadata;
                $scope.loadingFilter = false;
            });
    };

    $scope.addMetadata = function () {
        var name = $scope.newMetadata.name;
        if (!angular.isUndefined(name) && angular.isUndefined($scope.filter[name])) {
            $scope.filter[name] = [];
            if (!$scope.getMetadataByName(name).multivalue) {
                $scope.addMetadataValue(name);
            }
        }
        $scope.newMetadata = {};
    };

    $scope.addMetadataValue = function (metadata_name) {
        if ($scope.getMetadataByName(metadata_name).type == "text" || $scope.getMetadataByName(metadata_name).type == "url") {
            $scope.filter[metadata_name].push("");
        } else if ($scope.getMetadataByName(metadata_name).type == "tree" || $scope.getMetadataByName(metadata_name).type == "list" ) {
            $scope.filter[metadata_name].push($scope.getMetadataByName(metadata_name).options[0].value);
        }
    };


    $scope.deleteMetadataValue = function (metadata_name, index) {
        $scope.filter[metadata_name].splice(index, 1);
        if ($scope.filter[metadata_name].length == 0) {
            delete $scope.filter[metadata_name];
        }
    };

    $scope.getMetadataByName = function (metadata_name) {
        for (var metadata_index = 0; metadata_index < $scope.metadata.length; metadata_index++) {
            var metadata = $scope.metadata[metadata_index];
            if (metadata.name == metadata_name) {
                return metadata;
            }
        }
    };

    $scope.filterMetadataNames = function (value, index, array) {
        if (angular.isUndefined($scope.filter)) {
            return true;
        }
        else if (value.name in $scope.filter) {
            return false;
        } else {
            return true;
        }
    };

    $scope.search =  function() {
        $scope.loading = true;
        questionService.listQuestion($scope.filter)
            .success(function(questions) {
                $scope.questions = questions;
                $scope.loading = false;
            });
    };

    $scope.selectQuestion = function (questionData) {
        $modalInstance.close(questionData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.loadMetadata();

}]);