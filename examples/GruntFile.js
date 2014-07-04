
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    clean: {
      options:{
        force: true
      },
      lib: ['../fortune-admin*'],
      tmp: ['../templates.js']
    },
    html2js: {
      options: {
        rename: function(moduleName){
          moduleName = moduleName.replace('../../src', '');
          return moduleName;
        }
      },
      main: {
        src: ['../src/templates/**/*.html', '../src/templates/**/**/*.html'],
        dest: '../templates.js'
      }
    },
    concat: {
      '../fortune-admin.vendor.js': [
        'bower_components/angular-xeditable/dist/js/xeditable.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/d3/d3.js'
      ],
      '../fortune-admin.js': [
        '../templates.js',
        '../src/fortune-admin.js',
        '../src/**/*.js'
      ],
      '../fortune-admin.css': [
        'bower_components/angular-xeditable/dist/css/xeditable.css',
        '../src/main.css'
      ]
    },
    uglify: {
      target:{
        files: {
          '../fortune-admin.vendor.min.js': ['../fortune-admin.vendor.js'],
          '../fortune-admin.min.js': ['../fortune-admin.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['clean:lib', 'html2js', 'concat', 'addtemplates', 'clean:tmp', 'uglify']);

  grunt.registerTask('addtemplates', function(){
    var fs = require('fs');
    var main = fs.readFileSync('../fortune-admin.js', {encoding: 'utf-8'});

    main = main.replace("angular.module('fortuneAdmin', [", "angular.module('fortuneAdmin', [ 'templates-main', ");

    fs.writeFileSync('../fortune-admin.js', main);
  });
};

