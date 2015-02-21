var app = angular.module('app');

app.directive('testEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/test_editor.html',
        controller: ['$scope', '$modal', function($scope, $modal) {

            $scope.addTextElement = function() {
                $scope.data.content.push({type:'text', data: ''})
            };

            $scope.addNewQuestionElement = function() {
                $scope.data.content.push({type:'question', data: {}})
            };

            $scope.addExistingQuestionElement = function() {
                var selectQuestionModal = $modal.open({
                    templateUrl: "views/directives/test_editor_select_question.html",
                    controller: "TestEditorSelectQuestionController"
                });

                selectQuestionModal.result.then(function(question_data) {
                    $scope.data.content.push({type:'question', data: question_data})
                });
            };

            $scope.makeQuestionLocal = function($index) {
              delete $scope.data.content[$index].data.id;
            };

            $scope.deleteElement = function($index) {
                $scope.data.content.splice($index, 1);
            };

            $scope.moveElementUp = function($index) {
                var oldIndex = $index;
                var newIndex = $index-1;
                var element = $scope.data.content[$index];

                $scope.data.content.splice(oldIndex, 1);
                $scope.data.content.splice(newIndex, 0, element);

            };

            $scope.moveElementDown = function($index) {
                var oldIndex = $index;
                var newIndex = $index+1;
                var element = $scope.data.content[$index];

                $scope.data.content.splice(oldIndex, 1);
                $scope.data.content.splice(newIndex, 0, element);
            };



        }]
    }
});

app.controller('TestEditorSelectQuestionController', ['$scope', '$modalInstance', 'questionService', function($scope, $modalInstance, questionService) {
    // Set initial values
    $scope.loading = true;
    $scope.questions = [];

    // Function to load questions
    $scope.loadQuestions = function() {
        questionService.listQuestion({})
            .success(function(questions) {
                $scope.questions = questions;
            });
    };

    $scope.selectQuestion = function(questionData) {
        $modalInstance.close(questionData);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    // Load the questions now
    $scope.loadQuestions();
}]);