'use strict';
var directives = angular.module('fortuneAdmin.Directives', [
  'fortuneAdmin.umlDiagram'
]);

directives.directive('myNavbar', [ '$rootScope', function($rootScope) {
  return {
    restrict: 'E',

    templateUrl: 'templates/views/mynavbar.html',

    replace: true,

    transclude: true,

    scope: {},

    link: function (scope, element, attrs) {
      scope.r = $rootScope.r;
    }

  }
}]);