app.directive('treeTestTree', ['RecursionHelper', function (RecursionHelper) {
    return {
        restrict: 'E',
        scope: {
            content: '=',
            testSession: '=',
            path: '=',
            openElementHandler: '&',
            isElementOpen: '&',
            isElementVisited: '&'
        },
        templateUrl: 'views/directives/tree_test_tree.html',
        controller: ['$scope', '$rootScope', '$modal', function ($scope, $rootScope, $modal) {

            $scope.getPath = function(element) {
                return ($scope.path || '') + ($scope.content.indexOf(element)+1).toString() + "."
            };


        }],
        compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return RecursionHelper.compile(element);
        }
    }
}]);