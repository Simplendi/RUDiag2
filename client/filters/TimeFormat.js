angular.module('app');

app.filter('timeFormat', ['moment', function (moment) {
    return function (input, format) {
        input = input || '';
        format = format || 'YYYY-MM-DD HH:mm';

        return moment.utc(input).local().format(format);
    };
}]);