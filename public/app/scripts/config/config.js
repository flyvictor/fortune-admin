(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.fortuneAdmin =  {
    templateDirectory: '/templates/',
    templateFileQuerystring: '?v=' + this.appVersion,
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/templates/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(url){
      return this.viewUrlPrefix + url + this.templateFileSuffix + this.templateFileQuerystring;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    }
  };
})();
