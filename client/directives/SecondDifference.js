var app = angular.module('app');

app.directive('secondDifference', ['$interval', 'moment',
    function ($interval, moment) {
        return {
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, element, attrs, ngModel) {
                var stopUpdate; // so that we can cancel the time updates

                // used to update the UI
                function updateDifference() {
                    element.text(moment.utc().diff(moment.utc(ngModel.$modelValue), attrs['scale']));
                }

                stopUpdate = $interval(updateDifference, 1000);

                // listen on DOM destroy (removal) event, and cancel the next UI update
                // to prevent updating time after the DOM element was removed.
                element.on('$destroy', function () {
                    $interval.cancel(stopUpdate);
                });
            }
        }
    }]);