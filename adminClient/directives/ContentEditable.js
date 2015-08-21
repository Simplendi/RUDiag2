var app = angular.module('app');
app.directive('contenteditable', ['$sce', '$compile', function ($sce, $compile) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        scope: {
            disabled: '=ngDisabled'
        },
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
            };

            element.on('focus', function () {
                element.html(ngModel.$viewValue);
                scope.$apply(function () {
                    element.after($compile("<content-editor></content-editor>")(scope));
                });
            });

            element.on('keyup', function () {
                scope.$evalAsync(readValue(element.html()));
            });

            element.on('blur', function () {
                scope.$evalAsync(readValue(element.html()));
                element.next().filter("content-editor").remove();
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
            });

            function readValue(value) {
                return function () {
                    if(element.html().indexOf('class="MathJax') < 0) {
                        ngModel.$setViewValue(value);
                    }

                }
            }

            // Listen to disable
            scope.$watch('disabled', function (newVal) {
                element.attr("contenteditable", !newVal);
            })
        }
    };
}]);