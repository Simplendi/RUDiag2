module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
ngtemplates: {
            app: {
                src: ["views/*.html", "views/directives/*.html"],
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
                    beautify: true,
                    //compress: {
                    //    drop_console: false,
                    //},
                    mangle: false,
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
                        'directives/*.js',
                        'services/*.js',
                        'filters/*.js',
                        'build/templates.js',
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
                    'dist/app.min.css': [
                        'style.css',
                        'bower_components/bootstrap-css/css/bootstrap.css',
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

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task
    grunt.registerTask('default', ['ngtemplates', 'uglify:app', 'cssmin']);

};
