'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var environment = process.env.NODE_ENV || 'development';

    function config (environment) {
        if (environment === "bower") {
            return grunt.file.readJSON('./bower.json');
        }
        return grunt.file.readJSON('./config/' + environment + '.json');
    }

    grunt.initConfig({
            config: {
                path: require('path'),
                name: 'webApp',
                app: 'app',
                dist: 'dist',
                build: 'build',
                tmp: '.tmp',
                sasscache: '.sass-cache',
                scripts: 'scripts',
                views: 'views',
                images: 'images',
                styles: 'styles',
                downloads: 'downloads',
                components: 'bower_components',
                environment: environment,
                fonts: 'font'
            },
            connect: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                        base: [
                            '<%= config.tmp %>',
                            '<%= config.app %>'
                        ]
                    }
                },
                dist: {
                    options: {
                        base: '<%= config.dist %>'
                    }
                }
            },
            watch: {
                js: {
                    files: [
                        '<%= config.app %>/<%= config.scripts %>/bower_comp.js',
                        '<%= config.app %>/<%= config.scripts %>/config.js',
                        '<%= config.app %>/<%= config.scripts %>/appTemplates.js',
                        '<%= config.app %>/<%= config.scripts %>/app.js',
                        '<%= config.app %>/<%= config.scripts %>/controllers/*.js',
                        '<%= config.app %>/<%= config.scripts %>/directives/*.js',
                        '<%= config.app %>/<%= config.scripts %>/rest/*.js',
                        '<%= config.app %>/<%= config.scripts %>/services/*.js'
                    ],
                    options: {
                        livereload: true
                    },
                    tasks: ['autoprefixer','copy:scripts','concat','ngAnnotate','copy:appMainJs']
                },
                html: {
                    files: ['<%= config.app %>/<%= config.views %>/{,**/}*.html'],
                    options: {
                        livereload: true
                    },
                    tasks: ['copy:tmpTemplates','html2js','concat','ngAnnotate','copy:appMainJs']
                },
                compass: {
                    files: ['<%= config.app %>/<%= config.styles %>/{,**/}*.{scss,sass}'],
                    tasks: ['compass:server', 'autoprefixer']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= config.app %>/{,**/}*.html',
                        '<%= config.tmp %>/<%= config.styles %>/{,**/}*.css',
                        '<%= config.app %>/<%= config.images %>/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            },
            clean: {
                server: '<%= config.tmp %>',
                dist: '<%= config.dist %>',
                sasscache: '<%= config.sasscache %>',
                distBower: '<%= config.dist %>/<%= config.components %>',
                downloads: '<%= config.downloads %>',
                constants: '<%= config.app %>/<%= config.scripts %>/config.js',
                build: '<%= config.build %>',
                distDevelopment: '<%= config.build %>/development',
                distQa: '<%= config.build %>/qa',
                distStaging: '<%= config.build %>/staging',
                distProduction: '<%= config.build %>/production'
            },
            ngconstant: {
                options: {
                    space: '  ',
                    name: 'config',
                    dest: '<%= config.tmp %>/<%= config.scripts %>/config.js',
                    wrap: '"use strict";\n {%= __ngModule %}'
                },
                development: {
                    constants: {
                        TEST_API_URL: config("development").server.testUrl
                    }
                },
                qa: {
                    constants: {
                        TEST_API_URL: config("qa").server.testUrl
                    }
                },
                staging: {
                    constants: {
                        TEST_API_URL: config("staging").server.testUrl
                    }
                },
                production: {
                    constants: {
                        TEST_API_URL: config("production").server.testUrl
                    }
                }
            },
            compass: {
                options: {
                    sassDir: '<%= config.app %>/<%= config.styles %>',
                    imagesDir: '<%= config.app %>/<%= config.images %>',
                    javascriptsDir: '<%= config.app %>/<%= config.scripts %>',
                    importPath: '<%= config.app %>/<%= config.components %>',
                    httpImagesPath: '/<%= config.images %>',
                    httpGeneratedImagesPath: '/<%= config.images %>/generated',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    raw: 'Sass::Script::Number.precision = 10\n'
                },
                server: {
                    options: {
                        cssDir: '<%= config.tmp %>/<%= config.styles %>',
                        generatedImagesDir: '<%= config.tmp %>/<%= config.images %>/generated'
                    }
                }
            },
            autoprefixer: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= config.tmp %>/<%= config.styles %>/',
                            src: '{,**/}*.css',
                            dest: '<%= config.tmp %>/<%= config.styles %>/'
                        }
                    ]
                }
            },
            concat_css: {
                options: {},
                all: {
                    src: ['<%= config.tmp %>/<%= config.styles %>/*.css'],
                    dest: '<%= config.tmp %>/<%= config.styles %>/main.css'
                }
            },
            copy: {
                styles: {
                    src: '<%= config.tmp %>/<%= config.styles %>/main.css',
                    dest: '<%= config.dist %>/<%= config.styles %>/main.css'
                },
                appMainJs: {
                    src: '<%= config.dist %>/<%= config.scripts %>/main.js',
                    dest: '<%= config.app %>/<%= config.scripts %>/main.js'
                },
                appMainCss: {
                    src: '<%= config.tmp %>/<%= config.styles %>/main.css',
                    dest: '<%= config.app %>/<%= config.styles %>/main.css'
                },
                html: {
                    src: '<%= config.app %>/index.html',
                    dest: '<%= config.dist %>/index.html'
                },
                distComponents: {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.components %>/',
                    dest: '<%= config.dist %>//<%= config.components %>/',
                    src: ['**']
                },
                tmpTemplates: {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.views %>/',
                    dest: '<%= config.tmp %>/<%= config.views %>/',
                    src: ['**']
                },
                images: {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.images %>/',
                    dest: '<%= config.dist %>/<%= config.images %>/',
                    src: ['**']
                },
                font: {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.fonts %>/',
                    dest: '<%= config.dist %>/<%= config.fonts %>/',
                    src: ['**']
                },
                scripts: {
                    expand: true,
                    cwd: '<%= config.app %>/<%= config.scripts %>/',
                    dest: '<%= config.tmp %>/<%= config.scripts %>/',
                    src: ['controllers/*.js','directives/*.js','rest/*.js', 'services/*.js','app.js']
                },
                "distDevelopment": {
                    expand: true,
                    cwd: '<%= config.dist %>',
                    dest: '<%= config.build %>/development',
                    src: ['**']
                },
                "distQa": {
                    expand: true,
                    cwd: '<%= config.dist %>',
                    dest: '<%= config.build %>/qa',
                    src: ['**']
                },
                "distStaging": {
                    expand: true,
                    cwd: '<%= config.dist %>',
                    dest: '<%= config.build %>/staging',
                    src: ['**']
                },
                "distProduction": {
                    expand: true,
                    cwd: '<%= config.dist %>',
                    dest: '<%= config.build %>/production',
                    src: ['**']
                }
            },
            html2js: {
                options: {
                    base: 'app',
                    module: 'appTemplates',
                    singleModule: true,
                    useStrict: true,
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                main: {
                    src: ['<%= config.app %>/views/**/*.html'],
                    dest: '<%= config.tmp %>/scripts/appTemplates.js'
                }
            },
            concat: {
                options: {
                    separator: ';'
                },
                dist: {
                    src: [
                        '<%= config.tmp %>/<%= config.scripts %>/bower_comp.js',
                        '<%= config.tmp %>/<%= config.scripts %>/config.js',
                        '<%= config.tmp %>/<%= config.scripts %>/appTemplates.js',
                        '<%= config.tmp %>/<%= config.scripts %>/app.js',
                        '<%= config.tmp %>/<%= config.scripts %>/controllers/*.js',
                        '<%= config.tmp %>/<%= config.scripts %>/directives/*.js',
                        '<%= config.tmp %>/<%= config.scripts %>/rest/*.js',
                        '<%= config.tmp %>/<%= config.scripts %>/services/*.js'
                    ],
                    dest: '<%= config.dist %>/<%= config.scripts %>/main.js'
                }
            },
            ngAnnotate: {
                options: {
                    singleQuotes: true,
                    separator: ';'
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= config.dist %>/<%= config.scripts %>',
                        src: 'main.js',
                        dest: '<%= config.dist %>/<%= config.scripts %>'
                    }]
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                dist: {
                    files: {
                        '<%= config.dist %>/<%= config.scripts %>/main.js': ['<%= config.dist %>/<%= config.scripts %>/main.js']
                    }
                }
            },
            cssmin: {
                dist: {
                    files: {
                        '<%= config.dist %>/<%= config.styles %>/main.css': ['<%= config.dist %>/<%= config.styles %>/main.css']
                    }
                }
            },
            rev: {
                dist: {
                    files: {
                        src: [
                            '<%= config.dist %>/scripts/{,*/}*.js',
                            '<%= config.dist %>/styles/{,*/}*.css'
                        ]
                    }
                }
            },
            usemin: {
                html: ['<%= config.dist %>/index.html'],
                options: {
                    assetsDirs: ['<%= config.dist %>']
                }
            },
            wiredep: {
                task: {
                    src: ['<%= config.app %>/index.html']
                }
            },
            bower_concat: {
                all: {
                    dest: {
                        'js': '<%= config.tmp %>/<%= config.scripts %>/bower_comp.js',
                        'css': '<%= config.tmp %>/<%= config.styles %>/bower_comp.css'
                    }
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        '<%= config.dist %>/index.html': '<%= config.dist %>/index.html'
                    }
                }
            },
            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                },
                continuous: {
                    configFile: 'karma.conf.js',
                    singleRun: true,
                    browsers: ['PhantomJS']
                },
            }
        }
    );

    grunt.registerTask('taskCleanWorkingDirs', function () {
        grunt.task.run([
            'clean:server',
            'clean:dist',
            'clean:constants'
        ]);
    });

    grunt.registerTask('buildQa', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:qa',
            'taskBuildCode',
            'clean:distQa',
            'copy:distQa'
        ]);
    });

    grunt.registerTask('buildDev', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:development',
            'taskBuildCode',
            'clean:distDevelopment',
            'copy:distDevelopment'
        ]);
    });

    grunt.registerTask('buildProduction', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:production',
            'taskBuildCode',
            'clean:distProduction',
            'copy:distProduction'
        ]);
    });

    grunt.registerTask('buildStaging', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:staging',
            'taskBuildCode',
            'clean:distStaging',
            'copy:distStaging'
        ]);
    });

    grunt.registerTask('taskBuildCode', function () {
        grunt.task.run([
            'wiredep',
            'bower_concat',
            'compass',
            'autoprefixer',
            'concat_css',
            'copy:tmpTemplates',
            'html2js',
            'copy:scripts',
            'concat',
            'ngAnnotate',
            'uglify',
            'copy:styles',
            'copy:html',
            'copy:images',
            'copy:font',
            'cssmin',
            'rev',
            'usemin',
            'htmlmin',
            'clean:distBower',
            'clean:server',
            'clean:sasscache'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:build',
            'buildProduction',
            'buildStaging',
            'buildQa',
            'buildDev',
            'clean:dist'
        ]);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:development',
            'wiredep',
            'compass',
            'autoprefixer',
            'concat_css',
            'copy:tmpTemplates',
            'html2js',
            'copy:scripts',
            'concat',
            'ngAnnotate',
            'copy:appMainJs',
            'copy:appMainCss',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('unit', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:development',
            'wiredep',
            'compass',
            'autoprefixer',
            'concat_css',
            'copy:tmpTemplates',
            'html2js',
            'copy:scripts',
            'concat',
            'ngAnnotate',
            'copy:appMainJs',
            'copy:appMainCss',
            'karma:continuous'
        ]);
    });
};