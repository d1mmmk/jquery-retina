'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    vars: {
      port: 8080,
    },
    'closure-compiler': {
      frontend: {
        closurePath: '/home/d1mmmk/compiler',
        js: '<%= pkg.name %>.js', //входные данные
        jsOutputFile: '<%= pkg.name %>.min.js', //выходные
        noreport: true, //означает что в папке js не будет создаваться txt файл с отчетом
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          // formatting: 'pretty_print',
          warning_level: 'QUIET',
        }
      }
    },
    connect: {
      server: {
        options: {
          port: "<%= vars.port %>",
          keepalive: true,
          base: '.',
          static: '.'
        }
      }
    },
    coffee: {
      app: {
        files: {
          '<%= pkg.name %>.js': '<%= pkg.name %>.coffee',
        }
      },
    },
    watch: {
      coffee: {
        files: [
          '**/*.coffee',
          ],
        tasks: ['coffee']
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-closure-compiler');

  // Default task.
  grunt.registerTask('default', ['coffee', 'closure-compiler', 'connect']);
  grunt.registerTask('prod', ['coffee', 'closure-compiler']);

};
