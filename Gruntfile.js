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
            environment: environment
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
                dest: '<%= config.app %>/<%= config.scripts %>/config.js',
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
            distTemplates: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.views %>/',
                dest: '<%= config.dist %>//<%= config.views %>/',
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
                cwd: '<%= config.app %>/<%= config.font %>/',
                dest: '<%= config.dist %>/<%= config.font %>/',
                src: ['**']
            },
            scripts: {
                expand: true,
                cwd: '<%= config.app %>/<%= config.scripts %>/',
                dest: '<%= config.tmp %>/<%= config.scripts %>/',
                src: ['{,**/}*.js']
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
        }
    });

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
            'taskBuildCode'
        ]);
    });

    grunt.registerTask('buildDev', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:development',
            'taskBuildCode'
        ]);
    });

    grunt.registerTask('buildProduction', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:production',
            'taskBuildCode'
        ]);
    });

    grunt.registerTask('buildStaging', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:staging',
            'taskBuildCode'
        ]);
    });

    grunt.registerTask('taskBuildCode', function () {
        grunt.task.run([
            'compass',
            'autoprefixer',
            'concat_css',
            'copy:styles',
            'copy:html',
            'copy:distComponents',
            'copy:distTemplates',
            'copy:images',
            'copy:font',
            'copy:scripts',
            //'useminPrepare' //do no use
            //'concat',
            //'ngAnnotate',
            //'uglify',
            //'cssmin',
            //'rev',
            //'usemin',
            //'clean:distBower',
            //'clean:server',
            //'clean:sasscache'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:build',
            //'buildProduction',
            //'buildStaging',
            //'buildQa',
            'buildDev'
            //'clean:dist',
            //'clean:server',
            //'clean:sasscache'
        ]);
    });
};