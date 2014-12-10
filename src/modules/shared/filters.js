'use strict';
angular.module('sharedElements.Filters', [])
    .filter('filterLinks', [function(){
        return function(input){
            var nonLinks = {};
            angular.forEach(input, function(field, name){
                if (!angular.isObject(field) || !field.ref){
                    if (!angular.isArray(field) || !field[0] || !field[0].ref){
                        nonLinks[name] = field;
                    }
                }
            });
            return nonLinks;
        }
    }])

    // filter prevents alphabetical sort of object keys
    .filter('notSorted', [function(){
        return function(object){
            if (!object) {
                return [];
            }
            return Object.keys(object);
        }
    }]);