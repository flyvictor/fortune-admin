(function(angular){
  var config = window.CONFIG.docs;
  angular.module('docs.Directives', [])
      .directive('methodDescription', function(){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/description'),
              scope: {
                  resource: '='
              }
          }
      })
      .directive('methodExample', function(){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/example'),
              scope: {
                  resource: '='
              }
          }
      })
})(angular);
