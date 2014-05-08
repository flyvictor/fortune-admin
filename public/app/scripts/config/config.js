/**
 * Created by aldo on 5/4/14.
 */
var CONFIG;

(function() {

  var appPrefix = '/';
  var templateUrlPrefix = 'templates/';
  var appVersion = 8;

  CONFIG = {

    version : appVersion,

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
