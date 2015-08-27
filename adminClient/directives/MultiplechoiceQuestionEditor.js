var app = angular.module('app');

app.directive('multiplechoiceQuestionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/multiplechoice_question_editor.html',
        controller: ['$scope', function($scope) {
            if(angular.isUndefined($scope.data.content)) {
                $scope.data.content = {}
            }
            $scope.addChoice = function() {
                if(angular.isUndefined($scope.data.content.choices)) {
                    $scope.data.content.choices = []
                }
                $scope.data.content.choices.push("");
            };
            $scope.deleteChoice = function($index) {
                $scope.data.content.choices.splice($index, 1);
                for(var answer_index = 0; answer_index < $scope.data.answers.length; answer_index++) {
                    for(var answer_option_index = 0; answer_option_index < $scope.data.content.choices.length; answer_option_index++) {
                        if($scope.data.answers[answer_index][answer_option_index]  >= $scope.data.content.choices.length) {
                            $scope.data.answers[answer_index].splice(answer_option_index, 1);
                        }
                    }
                }
            }
        }]
    }
});