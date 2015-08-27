var app = angular.module('app');

app.directive('questionEditor', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            inline: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/question_editor.html',
        controller: ['$scope', '$rootScope', 'userService', 'metadataService', function ($scope, $rootScope, userService, metadataService) {
            $scope.users = [];
            $scope.loadingUsers = false;
            $scope.newOwner = {};


            $scope.metadata = [];
            $scope.loadingMetadata = false;
            $scope.newMetadata = {};

            if (!$scope.disabled && !$scope.inline) {
                $scope.loadingUsers = true;
                userService.listUser()
                    .success(function (data) {
                        $scope.loadingUsers = false;
                        $scope.users = data;
                    });
            }

            $scope.loadingMetadata = true;
            metadataService.listMetadata()
                .success(function (data) {
                    $scope.loadingMetadata = false;
                    $scope.metadata = data;
                });


            $scope.getUserById = function (user_id) {
                for (var user_index = 0; user_index < $scope.users.length; user_index++) {
                    var user = $scope.users[user_index];
                    if (user.id == user_id) {
                        return user
                    }
                }
                return undefined;
            };

            $scope.canRemoveOwner = function (user_id) {
                return $rootScope.user.id != user_id;
            };

            $scope.addOwner = function () {
                if (!angular.isUndefined($scope.newOwner.id) && $scope.data.owners.indexOf($scope.newOwner.id) < 0) {
                    $scope.data.owners.push($scope.newOwner.id);
                }
                $scope.newOwner = {};
            };

            $scope.deleteOwner = function (index) {
                $scope.data.owners.splice(index, 1);
            };

            $scope.filterOwners = function (value, index, array) {
                if ($scope.data.owners.indexOf(value.id) >= 0) {
                    return false;
                } else {
                    return true;
                }
            };

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

            $scope.$watch('data.type', function (newValue, oldValue) {
                $scope.data.answers = [];
            })

        }]
    }
});