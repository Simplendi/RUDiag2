var app = angular.module('app');

app.directive('datetimePicker', ['$timeout', 'moment', function ($timeout, moment) {
        var format = 'YYYY-MM-DD HH:mm';

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngMin: "=",
                ngMax: "="
            },
            link: function (scope, element, attributes, ctrl) {
                element.datetimepicker({
                    format: format,
                    collapse: false,
                    sideBySide: true,
                });
                var picker = element.data("DateTimePicker");

                ctrl.$formatters.push(function (value) {
                    var date = moment.utc(value);
                    if (date.isValid()) {
                        return date.local().format(format);
                    }
                    return '';
                });
                scope.$watch('ngMin', function(newValue) {
                    var date = moment.utc(newValue);
                    if(angular.isDefined(newValue) && date.isValid()) {
                        $timeout(function() {
                            picker.minDate(date.local());
                        });
                    }
                });

                scope.$watch('ngMax', function(newValue) {
                    var date = moment.utc(newValue);
                    if(angular.isDefined(newValue) && date.isValid()) {

                        $timeout(function() {
                            picker.maxDate(date.local());
                        });
                    }
                });

                element.on('dp.change', function (event) {
                    scope.$apply(function() {
                        var date = picker.date();
                        ctrl.$setViewValue(date.utc().format("YYYY-MM-DDTHH:mm:ss"));
                    });
                });
            }
        };
    }]);