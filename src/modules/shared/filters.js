'use strict';
angular.module('sharedElements.Filters', [])
    .filter('filterFields', [function(){
        return function(input, fields){

            // var fields = displayFields.split(",");

            console.log("fields", fields);

            var nonLinks = {};
            angular.forEach(input, function(field, name){

                if (fields) {
                  console.log("field", field, name, fields[name]);
                  if ( fields[name] ) {
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