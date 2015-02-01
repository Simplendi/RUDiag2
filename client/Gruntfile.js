module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
ngtemplates: {
            app: {
                src: "views/*.html",
                dest: "build/templates.js",
                options: {
                    module: "app",
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    }
                }
            }
        },
        uglify: {

            app: {
                options: {
                    compress: {
                        drop_console: false,
                    },
                    mangle: true,
                    sourceMap: true,
                },
                files: {
                    'dist/app.min.js': [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'bower_components/angular-sanitize/angular-sanitize.js',
                        'bower_components/angular-route/angular-route.js',
                        'app.js',
                        'controllers/*.js',
                        'services/*.js',
                        'filters/*.js',
                        'build/templates.js',
                    ]
                }
            }
        },
        cssmin: {
            app: {
                files: {
                    'dist/app.min.css': [
                        'style.css',
                        'bower_components/bootstrap-css/css/bootstrap.css',
                    ]

                }
            }
        },
        copy: {
            app: {
                files: [
                ]
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task
    grunt.registerTask('default', ['ngtemplates', 'uglify', 'cssmin', 'copy']);

};
