module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n'
            },
            ngKookies: {
                files: {
                    './ngKookies.min.js': ['./ngKookies.js']
                }
            }
        },
        jshint: {
            options: {
                ignores: ['./ngKookies.min.js']
            },
            files: ['*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify']);
};
