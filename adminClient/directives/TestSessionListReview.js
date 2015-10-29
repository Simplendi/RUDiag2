var app = angular.module('app');

app.controller('TestSessionListReviewController', ['$scope', '$modalInstance', 'testSession', 'test', function ($scope, $modalInstance, testSession, test) {
    // Set initial values
    $scope.test_session = testSession;
    $scope.test = test;
    $scope.editable = false;

    $scope.init = function() {
        if ($scope.test.review_method == "manual" && $scope.test_session.reviewed_at != null) {
            $scope.editable = true;
        }
    };

    $scope.ok = function () {
        if ($scope.test.review_method == "manual" && $scope.test_session.reviewed_at != null) {
            $scope.test_session.manual_reviewed_at = new Date();
        }
        $modalInstance.close($scope.test_session);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.getNumberOfAnswersRight = function() {
        var count = 0;
        for(var question_index = 0; question_index < $scope.test_session.question_feedback.length; question_index++) {
            if($scope.test_session.question_feedback[question_index]["right"]) {
                count++;
            }
        }

        return count;
    };

    $scope.copyQuestionDefault = function(question_index) {
        $scope.test_session.question_feedback[question_index]["feedback"] =
            $scope.test_session.question_feedback[question_index]["feedback"] || "";
        if($scope.test_session.question_feedback[question_index]["right"]) {
            $scope.test_session.question_feedback[question_index]["feedback"] += $scope.test.question_feedback[question_index]["right"];
        } else {
            $scope.test_session.question_feedback[question_index]["feedback"] += $scope.test.question_feedback[question_index]["wrong"];
        }
    };

    $scope.copyTotalDefault = function() {
        var answers_right = $scope.getNumberOfAnswersRight();
        for(var total_feedback_index = 0; total_feedback_index < $scope.test.total_feedback.length; total_feedback_index++) {
            var total_feedback = $scope.test.total_feedback[total_feedback_index];
            if(total_feedback.min <= answers_right && total_feedback.max >= answers_right) {
                $scope.test_session.total_feedback += total_feedback.feedback;
            }
        }
    };

    $scope.init();
}]);