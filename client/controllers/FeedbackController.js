app.controller('FeedbackController', ['$scope', '$routeParams', '$interval', '$modal', 'runTestService', 'moment', function($scope, $routeParams, $interval, $modal, runTestService, moment) {
    $scope.saving = false;
    $scope.test = {};
    $scope.feedback = {};

    // The state indicates what state the controller has. There are multiple states:
    // loading: the test is loading
    // data: enter personal data requested
    // answer: answer the questions
    // done: test is answered
    // error: an unrecoverable error occurred.
    $scope.state = 'loading';

    $scope.init = function() {
        };

    $scope.init();

}]);