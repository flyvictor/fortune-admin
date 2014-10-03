(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.fortuneAdmin =  {
    templateDirectory: '/views/',
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(mod, url){
      console.log('resolved template url ', '/' + mod + this.viewUrlPrefix + url + this.templateFileSuffix);
      return this.viewUrlPrefix + url + this.templateFileSuffix;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    },
    authToken: ''
  };
})();
