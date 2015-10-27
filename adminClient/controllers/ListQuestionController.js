var app = angular.module('app');

app.controller('ListQuestionController', ['$scope', '$rootScope', 'questionService', 'metadataService', function($scope, $rootScope, questionService, metadataService) {
    // Set initial values
    $scope.loading = true;
    $scope.loadingFilter = true;
    $scope.filter = {};
    $scope.questions = [];
    $scope.metadata = [];

    // Variable to track metadata to add to filter
    $scope.newMetadata = {};

    $rootScope.title = "List Questions";

    // Function to load questions
    $scope.loadQuestions = function() {
        questionService.listQuestion($scope.filter)
            .success(function(questions) {
                $scope.questions = questions;
                $scope.loading = false;
            });
    };

    $scope.loadMetadata = function() {
        metadataService.listMetadata()
            .success(function(metadata) {
                $scope.metadata = metadata;
                $scope.loadingFilter = false;
        });
    };

    $scope.addMetadata = function () {
        var name = $scope.newMetadata.name;
        if (!angular.isUndefined(name) && angular.isUndefined($scope.filter[name])) {
            $scope.filter[name] = [];
            if (!$scope.getMetadataByName(name).multivalue) {
                $scope.addMetadataValue(name);
            }
        }
        $scope.newMetadata = {};
    };

    $scope.addMetadataValue = function (metadata_name) {
        if ($scope.getMetadataByName(metadata_name).type == "text" || $scope.getMetadataByName(metadata_name).type == "url") {
            $scope.filter[metadata_name].push("");
        } else if ($scope.getMetadataByName(metadata_name).type == "tree" || $scope.getMetadataByName(metadata_name).type == "list" ) {
            $scope.filter[metadata_name].push($scope.getMetadataByName(metadata_name).options[0].value);
        }
    };


    $scope.deleteMetadataValue = function (metadata_name, index) {
        $scope.filter[metadata_name].splice(index, 1);
        if ($scope.filter[metadata_name].length == 0) {
            delete $scope.filter[metadata_name];
        }
    };

    $scope.getMetadataByName = function (metadata_name) {
        for (var metadata_index = 0; metadata_index < $scope.metadata.length; metadata_index++) {
            var metadata = $scope.metadata[metadata_index];
            if (metadata.name == metadata_name) {
                return metadata;
            }
        }
    };

    $scope.filterMetadataNames = function (value, index, array) {
        if (angular.isUndefined($scope.filter)) {
            return true;
        }
        else if (value.name in $scope.filter) {
            return false;
        } else {
            return true;
        }
    };

    $scope.search =  function() {
        $scope.loading = true;
        questionService.listQuestion($scope.filter)
            .success(function(questions) {
                $scope.questions = questions;
                $scope.loading = false;
            });
    };


    // Load the questions now
    $scope.loadQuestions();
    $scope.loadMetadata();

}]);