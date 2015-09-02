var app = angular.module('app');

app.controller('TestSessionListEditDataController', ['$scope', '$modalInstance', 'testSession', function ($scope, $modalInstance, testSession) {
    // Set initial values
    $scope.testSession = testSession;

    $scope.ok = function () {
        $modalInstance.close($scope.testSession);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);