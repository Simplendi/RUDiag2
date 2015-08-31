var app = angular.module('app');

app.directive('testEditor', function () {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/test_editor.html',
        controller: ['$scope', '$modal', 'moment', function ($scope, $modal, moment) {

            $scope.now = moment.utc();

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
                while($scope.data.total_feedback.length > $scope.data.question_feedback.length+1) {
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
            }


        }]
    }
});

app.controller('TestEditorSelectQuestionController', ['$scope', '$modalInstance', 'questionService', function ($scope, $modalInstance, questionService) {
    // Set initial values
    $scope.loading = true;
    $scope.questions = [];

    // Function to load questions
    $scope.loadQuestions = function () {
        questionService.listQuestion({})
            .success(function (questions) {
                $scope.questions = questions;
            });
    };

    $scope.selectQuestion = function (questionData) {
        $modalInstance.close(questionData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // Load the questions now
    $scope.loadQuestions();
}]);