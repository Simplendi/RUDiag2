var app = angular.module('app');

app.controller('TestSessionListReviewController', ['$scope', '$modalInstance', 'testSession', 'test', function ($scope, $modalInstance, testSession, test) {
    // Set initial values
    $scope.test_session = testSession;
    $scope.test = test;

    $scope.ok = function () {
        $modalInstance.close($scope.test_session);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);