
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    clean: {
      lib: ['lib/*'],
      tmp: ['lib/templates.js']
    },
    html2js: {
      options: {
        rename: function(moduleName){
          return '/' + moduleName;
        }
      },
      main: {
        src: ['src/templates/**/*.html', 'src/templates/**/**/*.html'],
        dest: 'lib/templates.js'
      }
    },
    concat: {
      'lib/fortune-admin.vendor.js': [
        'bower_components/angular-xeditable/dist/js/xeditable.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/d3/d3.js'
      ],
      'lib/fortune-admin.js': [
        'lib/templates.js',
        'src/fortune-admin.js',
        'src/**/*.js'
      ],
      'lib/fortune-admin.css': [
        'bower_components/angular-xeditable/dist/css/xeditable.css',
        'src/main.css'
      ]
    },
    uglify: {
      target:{
        files: {
          'lib/fortune-admin.vendor.min.js': ['lib/fortune-admin.vendor.js'],
          'lib/fortune-admin.min.js': ['lib/fortune-admin.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['clean:lib', 'html2js', 'concat', 'addtemplates', 'clean:tmp', 'uglify']);

  grunt.registerTask('addtemplates', function(){
    var fs = require('fs');
    var main = fs.readFileSync('lib/fortune-admin.js', {encoding: 'utf-8'});

    main = main.replace("angular.module('fortuneAdmin', [", "angular.module('fortuneAdmin', [ 'templates-main', ");

    fs.writeFileSync('lib/fortune-admin.js', main);
  });
};

