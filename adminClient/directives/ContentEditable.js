var app = angular.module('app');
app.directive('contenteditable', ['$sce', '$compile', function ($sce, $compile) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        scope: {
            disabled: '=ngDisabled',
            text: '=ngText'
        },
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            scope.model = ngModel;
            scope.element = element;

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
                if(!scope.text) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
                }
            };

            element.on('focus', function () {
                element.html(ngModel.$viewValue);
                if(!scope.text) {
                    scope.$apply(function () {
                        element.after($compile("<content-editor></content-editor>")(scope));
                    });
                }
            });

            element.on('keyup', function () {
                scope.$evalAsync(readValue(element));
            });

            element.on('blur', function () {
                scope.$evalAsync(readValue(element));
                if(!scope.text) {
                    element.next().filter("content-editor").remove();
                    angular.element("a", element).attr("target", "_blank");
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
                }
            });

            scope.readValue = function() {
                readValue(element);
            };

            function readValue(element_value) {
                return function () {
                    if(element.html().indexOf('class="MathJax') < 0) {
                        if(scope.text) {
                            ngModel.$setViewValue(element_value.text());
                            element.html(element_value.text());
                        } else {
                            ngModel.$setViewValue(element_value.html());
                        }
                    }

                }
            }

            // Listen to disable
            scope.$watch('disabled', function (disabled) {
                element.attr("contenteditable", !disabled);
                if(disabled) {
                    if(element.hasClass("editable")) {
                        element.removeClass("editable");
                    }
                } else {
                    element.addClass("editable");
                }
            })
        }
    };
}]);