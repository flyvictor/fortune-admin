/**
 * Created by aldo on 5/4/14.
 */
var CONFIG;

(function() {

  var appPrefix = '/';
  var templateUrlPrefix = 'templates/';
  var baseRESTEndpoint = ''; //'http://victor-dev-routing-service.herokuapp.com';
  var appVersion = 8;
  var apiNamespace = '/api/v1';

  CONFIG = {

    version : appVersion,

    baseEndpoint: baseRESTEndpoint,
    getApiNamespace: function(){
      return baseRESTEndpoint + apiNamespace;
    },

    baseDirectory : appPrefix,
    templateDirectory : templateUrlPrefix,
    templateFileQuerystring : "?v=" + appVersion,

    routing : {

      prefix : '',
      html5Mode : true

    },

    viewUrlPrefix : templateUrlPrefix + 'views/',
    partialUrlPrefix : templateUrlPrefix + 'partials/',

    templateFileSuffix : '.html',

    prepareViewTemplateUrl : function(url) {
      return this.viewUrlPrefix + url + this.templateFileSuffix + this.templateFileQuerystring;
    }

  };

})();
