(function(angular){
  angular.module('fortuneAdmin.umlDiagram', [])
    .service('umlData', ['$http', '$q', umlData])
    .directive('umlCanvas', [umlCanvas])
    .directive('umlResource', [umlResource])
    .directive('umlPath', [umlPath])
    .directive('umlLink', [umlLink]);

  function umlData($http, $q){
    var metadata = {};

    this.load = function(){
      if (metadata) return metadata;
      return $http.get('/metadata').success(function(data){
        return data.metadata;
      });
    };

  }

  function umlCanvas(umlData){
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/canvas.html',
      controller: function($scope, $element){
        $scope.data = umlData.load();
      },
      compile: function(tElt, tAttrs){

        return function postLink(scope, elt, attrs){

        }
      }
    }
  }

  function umlResource(){
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/canvas.html',
      compile: function(tElt, tAttrs){
        return function postLink(scope, elt, attrs){

        }
      }
    }
  }

  function umlPath(){
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/canvas.html',
      compile: function(tElt, tAttrs){
        return function postLink(scope, elt, attrs){

        }
      }
    }
  }

  function umlLink(){
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/canvas.html',
      compile: function(tElt, tAttrs){
        return function postLink(scope, elt, attrs){

        }
      }
    }
  }
})(angular);
