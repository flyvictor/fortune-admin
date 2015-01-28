'use strict';
angular.module('sharedElements.Filters', [])
    .filter('filterFields', [function(){
        return function(input, fields){

            if (typeof fields === 'string') {
                fields = fields.split(",");
            }
            // Kept for backwards compatibility with old filter methods.
            /* @todo Check if this is needed/update dependent code */
            else if (fields.isArray) {
                console.log('filterFields passed Array fields');
                fields = Object.keys(fields);
            }

            var nonLinks = {};

            angular.forEach(input, function(field, name){

                if (fields) {
                  if ( fields.indexOf(name) !== -1 ) {
                    nonLinks[name] = field;
                  }
                }
                else {
                    if (!angular.isObject(field) || !field.ref){
                        if (!angular.isArray(field) || !field[0] || !field[0].ref ){
                            nonLinks[name] = field;
                        }
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
