(function(angular){
  angular.module('fortuneAdmin.Filters', [
      'fortuneAdmin.Constants'
    ])
    .filter('userRoles', ['ConstUserRoles', userRoles])
    .filter('userNationality', ['ConstCountries', userNationality])
    .filter('userTitle', ['ConstUserTitles', userTitle])
    .filter('addressTypes', ['ConstAddressTypes', addressTypes])
    .filter('addressCountry', ['ConstCountries', addressCountry])
    .filter('addressUsers', [addressUsers]);

  /**
   * The following are just proxies to value filter to make views more readable
   */
  function userRoles(roles){
    return function(input){
      return valueFilter(roles, input);
    }
  }

  function userNationality(countries){
    return function(input){
      return valueFilter(countries, input);
    }
  }

  function userTitle(titles){
    return function(input){
      return valueFilter(titles, input);
    }
  }

  function addressTypes(types){
    return function(input){
      return valueFilter(types, input);
    }
  }

  function addressCountry(countries){
    return function(input){
      return valueFilter(countries, input);
    }
  }

  /**
   * Actual filter. Does all the heavy lifting
   * @param list
   * @param criteria
   */
  function valueFilter(list, criteria){
    return list.find(function(item){
      return item.value === criteria;
    }) || 'Not set';
  }

  function addressUsers(){
    return function(address, users){
      var selected = null;
      if(address.links && address.links.user) {
        selected = users.find(function(user){
          return user.id === address.links.user;
        });
      }
      return selected ? selected[0].firstName + selected[0].lastName : 'Not set';
    }
  }

})(angular);
