var app = angular.module('app');

app.controller('TestSessionListReviewController', ['$scope', '$modalInstance', 'testSession', 'test', function ($scope, $modalInstance, testSession, test) {
    // Set initial values
    $scope.test_session = testSession;
    $scope.test = test;
    $scope.editable = false;

    $scope.init = function() {
        if ($scope.test.review_method == "manual" && $scope.test_session.reviewed_at == null) {
            $scope.editable = true;
        }
    };

    $scope.ok = function () {
        $modalInstance.close($scope.test_session);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    $scope.reviewQuestionsAutomatically = function() {

    };

    $scope.reviewTotalAutomatically = function() {

    };

    $scope.init();
}]);