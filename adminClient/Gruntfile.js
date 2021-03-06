module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            app: {
                src: ["views/*.html", "views/directives/*.html"],
                dest: "build/templates.js",
                options: {
                    module: "app",
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        uglify: {

            app: {
                options: {
                    beautify: false,
                    //compress: {
                    //    drop_console: false,
                    //},
                    mangle: true,
                    sourceMap: true,
                },
                files: {
                    'dist/app.min.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/moment/moment.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'bower_components/angular-sanitize/angular-sanitize.js',
                        'bower_components/angular-moment/angular-moment.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/angular-ui-select/dist/select.js',
                        'bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
                        'bower_components/ng-file-upload/ng-file-upload.js',
                        'app.js',
                        'controllers/*.js',
                        'directives/*.js',
                        'services/*.js',
                        'filters/*.js',
                        'build/templates.js'
                    ]
                }
            },
            mathjax: {
                options: {
                    beautify: false,
                    //compress: {
                    //    drop_console: false,
                    //},
                    mangle: false,
                    sourceMap: false,
                },
                files: {
                    'dist/MathJax/config/config.js': [
                        'bower_components/MathJax/jax/input/TeX/config.js',
                        'bower_components/MathJax/jax/output/HTML-CSS/config.js',
                        'bower_components/MathJax/extensions/tex2jax.js',
                        'bower_components/MathJax/extensions/Tex/mhchem.js',
                        'bower_components/MathJax/extensions/Tex/AMSmath.js',
                        'bower_components/MathJax/extensions/Tex/AMSsymbols.js',
                        'custom/MathJax/config.js',
                    ]
                }

            }
        },
        cssmin: {
            app: {
                files: {
                    'dist/css/app.min.css': [
                        'bower_components/bootstrap-css/css/bootstrap.css',
                        'bower_components/angular-ui-select/dist/select.css',
                        'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                        'style.css',
                    ]

                }
            }
        },
        copy: {
            mathjax: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/',
                    src: 'MathJax/**',
                    dest: 'dist/'
                }]
            },
            static: {
                files: [
                    {
                        src: 'img/**',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-css/',
                        src: 'fonts/*',
                        dest: 'dist/'
                    }

                ]
            }
        },
        watch: {
            files: ["style.css", "controllers/*.js", "directives/*.js", "services/*.js", "views/**/*.html"],
            tasks: ['default']
        }


    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['ngtemplates', 'uglify:app', 'cssmin']);

};
