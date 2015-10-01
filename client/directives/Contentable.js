var app = angular.module('app');
app.directive('contentable', ['$sce', '$compile', function ($sce, $compile) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
                if(ngModel.$viewValue) {
                    var view = $compile("<div>" + ngModel.$viewValue + "</div>")(scope);
                    element.html(angular.element(view));
                    angular.element("a", element).attr("target", "_blank");
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
                }
            };
        }
    };
}]);