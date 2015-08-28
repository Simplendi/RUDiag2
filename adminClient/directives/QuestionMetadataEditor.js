app.directive('questionMetadataEditor', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/question_metadata_editor.html',
        controller: ['$scope', '$rootScope', '$modal', 'metadataService', function ($scope, $rootScope, $modal, metadataService) {
            $scope.metadata = [];
            $scope.loadingMetadata = false;
            $scope.newMetadata = {};

            $scope.loadingMetadata = true;
            metadataService.listMetadata()
                .success(function (data) {
                    $scope.loadingMetadata = false;
                    $scope.metadata = data;
                });

            $scope.addMetadata = function () {
                var name = $scope.newMetadata.name;
                if (angular.isUndefined($scope.data.metadata)) {
                    $scope.data.metadata = {};
                }
                if (!angular.isUndefined(name) && angular.isUndefined($scope.data.metadata[name])) {
                    $scope.data.metadata[name] = [];
                    if (!$scope.getMetadataByName(name).multivalue) {
                        $scope.addMetadataValue(name);
                    }
                }
                $scope.newMetadata = {};
            };

            $scope.filterMetadataNames = function (value, index, array) {
                if (angular.isUndefined($scope.data.metadata)) {
                    return true;
                }
                else if (value.name in $scope.data.metadata) {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.addMetadataValue = function (metadata_name) {
                if ($scope.getMetadataByName(metadata_name).type == "text" || $scope.getMetadataByName(metadata_name).type == "url") {
                    $scope.data.metadata[metadata_name].push("");
                } else if ($scope.getMetadataByName(metadata_name).type == "tree") {
                    $scope.data.metadata[metadata_name].push($scope.getMetadataByName(metadata_name).options[0].value);
                }
            };

            $scope.deleteMetadataValue = function (metadata_name, index) {
                $scope.data.metadata[metadata_name].splice(index, 1);
                if ($scope.data.metadata[metadata_name].length == 0) {
                    delete $scope.data.metadata[metadata_name];
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
        }]
    }
});