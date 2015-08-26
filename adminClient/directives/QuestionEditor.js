var app = angular.module('app');

app.directive('questionEditor', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            inline: '=',
            disabled: '=ngDisabled'
        },
        templateUrl: 'views/directives/question_editor.html',
        controller: ['$scope', '$rootScope', 'userService', function($scope, $rootScope, userService) {
            $scope.users = [];
            $scope.loadingUsers = true;
            $scope.newOwner = {};

            if(!$scope.disabled && !$scope.inline) {
                userService.listUser()
                    .success(function (data) {
                        $scope.loadingUsers = false;
                        $scope.users = data;
                    });
            }


            $scope.getUserById = function(user_id) {
                for(var user_index = 0; user_index < $scope.users.length; user_index++) {
                    var user = $scope.users[user_index];
                    if(user.id==user_id) {
                        return user
                    }
                }
                return undefined;
            };

            $scope.canRemoveOwner = function(user_id) {
                return $rootScope.user.id != user_id;
            };

            $scope.addOwner = function() {
                if(!angular.isUndefined($scope.newOwner.id) && $scope.data.owners.indexOf($scope.newOwner.id) < 0) {
                    $scope.data.owners.push($scope.newOwner.id);
                }
            };

            $scope.deleteOwner = function(index) {
                $scope.data.owners.splice(index, 1);
            };

            $scope.filterOwners = function(value, index, array) {
                if($scope.data.owners.indexOf(value.id) >= 0) {
                    return false;
                } else {
                    return true;
                }
            };

        }]
    }
});