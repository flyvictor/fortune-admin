
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
      'lib/fortune-admin.tpls.js': [
        'lib/templates.js',
        'bower_components/angular-xeditable/dist/js/xeditable.js',
        'bower_components/joint/dist/joint.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'src/fortune-admin.js',
        'src/**/*.js'
      ],
      'lib/fortune-admin.css': [
        'src/main.css',
        'bower_components/joint/joint.css',
        'bower_components/angular-xeditable/dist/css/xeditable.css'
      ]
    },
    uglify: {
      target:{
        files: {
          'lib/fortune-admin.tpls.min.js': ['lib/fortune-admin.tpls.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['clean:lib', 'html2js', 'concat', 'addtemplates', 'clean:tmp', 'uglify']);

  grunt.registerTask('addtemplates', function(){
    var fs = require('fs');
    var main = fs.readFileSync('lib/fortune-admin.tpls.js', {encoding: 'utf-8'});

    main = main.replace("angular.module('fortuneAdmin', [", "angular.module('fortuneAdmin', [ 'templates-main', ");

    fs.writeFileSync('lib/fortune-admin.tpls.js', main);
  });
};

