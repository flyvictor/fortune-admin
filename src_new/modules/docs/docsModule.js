
angular.module('docs', [
    'sharedElements',
    'docs.Config',
    'docs.Controllers',
    'docs.Directives'
])
.provider('docs', [ 'docsConfigConstant', function(config){
    var lookup = {};
    var otherwiseLookup = null;

    var ROUTER = {
        when: function(key, url, params) {
            lookup[key] = {
                url : url,
                params : params
            };
        },

        install: function($routeProvider) {
            for(var key in lookup) {
                var route = lookup[key];
                var url = route['url'];
                var params = route['params'];
                $routeProvider.when(url, params);
            }
            if(otherwiseLookup) {
                $routeProvider.otherwise(otherwiseLookup);
            }
        }
    };

    //var config = CONFIG.docs;
    return {
        setApiHost: function(host){
            config.baseEndpoint = host;
        },
        setApiNamespace: function(namespace){
            config.apiNamespace = namespace;
        },
        html5Mode: function(use, prefix){
            config.routing.html5Mode = !!use;
            config.routing.urlPrefix = prefix || '';
        },
        enableNavbar: function(){
            config.enableNavbar = true;
        },
        mountTo: function($routeProvider, mountPoint){

            ROUTER.when('docs_page', mountPoint + '/docs', {
                templateUrl : config.prepareViewTemplateUrl('docs', 'docs'),
                controller:'DocsCtrl as DocsCtrl',
                resolve: {
                    resources: ['$q', '$http', function($q, $http){
                        var d = $q.defer();
                        $http.get(config.baseEndpoint + '/resources').success(function(data){
                            d.resolve(data.resources);
                        });
                        return d.promise;
                    }]
                }
            });

            ROUTER.install($routeProvider);
        },

        $get: ['docsConfigConstant', function(config){
            return {

                getRoute: function(key) {
                    return lookup[key];
                },

                replaceUrlParams: function(url, params) {
                    for(var k in params) {
                        var v = params[k];
                        url = url.replace(':'+k,v);
                    }
                    return url;
                },

                routeDefined: function(key) {
                    return !! this.getRoute(key);
                },

                routePath: function(key, args) {
                    var url = this.getRoute(key);
                    url = url ? url.url : null;
                    if(url && args) {
                        url = this.replaceUrlParams(url, args);
                    }
                    return config.routing.html5Mode ? url : '/#' + config.routing.urlPrefix + url;
                },

                setApiHost: function(host){
                    config.baseEndpoint = host;
                },
                setApiNamespace: function(namespace){
                    config.apiNamespace = namespace;
                },
                setAuthToken: function(token){
                    config.authToken = token;
                }
            }
        }]
    }
}])

.run(['$rootScope', '$location', 'docs', 'editableOptions', 'docsConfigConstant',
    function($rootScope, $location, docs, editableOptions, config) {
        var prefix = '';

        $rootScope.docsRoute = function(url, args) {
            return prefix + docs.routePath(url, args);
        };
        //$rootScope.navbarEnabled = !!CONFIG.docs.enableNavbar;
        $rootScope.navbarEnabled = config.enableNavbar;

        // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.theme = 'bs3';
    }]);
