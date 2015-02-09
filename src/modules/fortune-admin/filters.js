'use strict';
angular.module('fortuneAdmin.Filters', [])
  .filter('singleActions', [function(){
    return function(input){
      var filtered = [];
      angular.forEach(input, function(item){
        if (item.single){
          filtered.push(item);
        }
      });
      return filtered;
    }
  }])
  .filter('bulkActions', [function(){
    return function(input){
      var filtered = [];
      angular.forEach(input, function(item){
        if (item.bulk){
          filtered.push(item);
        }
      });
      return filtered;
    }
  }]);