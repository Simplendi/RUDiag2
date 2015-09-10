app.directive('testFeedback', function() {
    return {
        restrict: 'E',
        scope: {
            test: '=',
            testSession: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/test_feedback.html',
        controller: ['$scope', function ($scope) {

            $scope.contentToQuestionIndex = function (index) {
                var question_index = -1;
                for (var content_index = 0; content_index <= index && content_index < $scope.test.content.length; content_index++) {
                    if ($scope.test.content[content_index].type == 'question') {
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
                for (var content_index = 0; content_index < $scope.test.content.length; content_index++) {
                    if ($scope.test.content[content_index].type == 'question') {
                        question_index++;
                    }
                    if (question_index == index) {
                        return content_index;
                    }
                }
                return -1;
            };

        }]
    }
});