
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
      data_example: {
        command: 'curl -X POST -d @examples/sampleData.json -H "Content-Type: application/json" http://127.0.0.1:1337/api/v1/addresses'
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
          console.log('renaming ', moduleName);
          moduleName = moduleName.replace(/modules\/[\w-]+/, '');
          console.log('resulting template url ', moduleName);
          return moduleName;
        }
      },
      main: {
        src: ['src/modules/**/**/**/*.html'],
        dest: 'templates.js'
      }
    },
    concat: {
      'fortune-admin.vendor.js': [
        'bower_components/angular-xeditable/dist/js/xeditable.js',
        'src/ui-boostrap-custom-build/ui-bootstrap-custom-tpls-0.12.0.min.js',
        'bower_components/d3/d3.js'
      ],
      'fortune-admin.js': [
        'templates.js',
        'src/fortune-admin.js',
        'src/**/*.js'
      ],
      'fortune-admin.css': [
        'bower_components/angular-xeditable/dist/css/xeditable.css',
        'src/styles/main.css'
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
  grunt.registerTask('serve:example', ['build', 'shell:serve_example']);
  grunt.registerTask('data:example', ['shell:data_example']);
  grunt.registerTask('test', ['shell:test']);
  grunt.registerTask('default', ['build']);

  grunt.registerTask('addtemplates', function(){
    var fs = require('fs');
    var main = fs.readFileSync('fortune-admin.js', {encoding: 'utf-8'});

    main = main.replace("angular.module('fortuneAdmin', [", "angular.module('fortuneAdmin', [ 'templates-main', ");

    fs.writeFileSync('fortune-admin.js', main);
  });
};

