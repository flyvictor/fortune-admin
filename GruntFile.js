
module.exports = function(grunt){
  
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    shell: {
      bower_install: {
        command: 'bower install'
      },
      install_example: {
        command: 'git submodule init; git submodule update; cd examples/lib/fortune; npm install;'
      },
      serve_example: {
        command: 'node examples/server.js;'
      },
      test : {
        command: './node_modules/karma/bin/karma start karma.conf.js'
      }
    },
    clean: {
      options:{
        force: true
      },
      lib: ['fortune-admin*'],
      tmp: ['templates.js']
    },
    html2js: {
      options: {
        rename: function(moduleName){
          moduleName = moduleName.replace('../../src', '');
          return moduleName;
        }
      },
      main: {
        src: ['src/templates/**/*.html', 'src/templates/**/**/*.html'],
        dest: 'templates.js'
      }
    },
    concat: {
      'fortune-admin.vendor.js': [
        'bower_components/angular-xeditable/dist/js/xeditable.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/d3/d3.js'
      ],
      'fortune-admin.js': [
        'templates.js',
        'src/fortune-admin.js',
        'src/**/*.js'
      ],
      'fortune-admin.css': [
        'bower_components/angular-xeditable/dist/css/xeditable.css',
        'src/main.css'
      ]
    },
    uglify: {
      target:{
        files: {
          'fortune-admin.vendor.min.js': ['fortune-admin.vendor.js'],
          'fortune-admin.min.js': ['fortune-admin.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['clean:lib', 'html2js', 'concat', 'addtemplates', 'clean:tmp', 'uglify']);
  grunt.registerTask('install', ['shell:bower_install']);
  grunt.registerTask('install:example', ['install', 'shell:install_example']);
  grunt.registerTask('serve:example', ['shell:serve_example']);
  grunt.registerTask('test', ['shell:test']);
  grunt.registerTask('default', ['build']);

  grunt.registerTask('addtemplates', function(){
    var fs = require('fs');
    var main = fs.readFileSync('fortune-admin.js', {encoding: 'utf-8'});

    main = main.replace("angular.module('fortuneAdmin', [", "angular.module('fortuneAdmin', [ 'templates-main', ");

    fs.writeFileSync('fortune-admin.js', main);
  });
};

