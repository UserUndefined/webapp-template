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
            'ngconstant:qa'
        ]);
    });

    grunt.registerTask('buildDev', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:development'
        ]);
    });

    grunt.registerTask('buildProduction', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:production'
        ]);
    });

    grunt.registerTask('buildStaging', function () {
        grunt.task.run([
            'taskCleanWorkingDirs',
            'ngconstant:staging'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:build',
            //'buildProduction',
            //'buildStaging',
            //'buildQa',
            'buildDev',
            'clean:dist',
            'clean:server',
            'clean:sasscache'
        ]);
    });
};