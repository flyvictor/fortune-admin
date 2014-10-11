angular.module('docs.Services.docsHTTP', [
    'docs.Config'
])
    .service('docsHTTP', ['docsConfigConstant', '$http',
        function docsHTTP(docsConfig, $http) {
            this.sendRequest = function (method, route, request) {
                var httpRequest = {};
                httpRequest.method = method;
                httpRequest.url = docsConfig.getApiNamespace() + '/' + route;
                if (request.headers) httpRequest.headers = request.headers;

                // for delete and put methods
                if (request.id) httpRequest.url += '/' + request.id;

                // for post and put (requests with body)
                if (request.data) {
                    httpRequest.headers["Content-Type"] = 'application/json';
                }

                if (request.params) {
                    httpRequest.params = {};
                    for (var param in request.params) {
                        if (request.params.hasOwnProperty(param)) {
                            var paramValue = request.params[param];
                            if (Array.isArray(paramValue)) {
                                httpRequest.params[param] = paramValue.join(',');
                            }
                            else httpRequest.params[param] = paramValue;
                        }
                    }
                }

                if(request.data) httpRequest.data = request.data;

                return $http(httpRequest);
            }
        }
    ]);