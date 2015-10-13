var app = angular.module('app');

app.controller('TestSessionListEditDataController', ['$scope', '$modalInstance', 'testSession', 'test', function ($scope, $modalInstance, testSession, test) {
    // Set initial values
    $scope.testSession = testSession;
    $scope.test = test;

    $scope.ok = function () {
        $modalInstance.close($scope.testSession);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);