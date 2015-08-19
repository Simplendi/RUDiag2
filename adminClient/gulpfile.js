var gulp = require('gulp');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var merge = require('merge-stream');
var sourcemaps = require("gulp-sourcemaps");


gulp.task('build', function() {
    var templates = gulp.src(["./views/**/*.html"])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "app",
            prefix: 'views/'
        }))
        .pipe(concat('templates.js'));

    var sources = gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-route/angular-route.js',
        'app.js',
        'controllers/*.js',
        'directives/*.js',
        'services/*.js',
        'filters/*.js',
    ]);

    return merge(templates, sources)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify({
            mangle: true,

        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist2'));


});