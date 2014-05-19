(function(angular){
  angular.module('fortuneAdmin.Constants', [])
    .constant('ConstUserTitles', [
      {value: 'Mr.', text: 'Mr.'},
      {value: 'Mrs.', text: 'Mrs.'}
    ])
    .constant('ConstUserRoles', [
      { value: 'viewer', text: 'viewer' },
      { value: 'admin', text: 'admin' },
      { value: 'programmer', text: 'programmer' },
      { value: 'sysadmin', text: 'sysadmin' }
    ])
    .constant('ConstCountries', [
      {value: 'UK', text: 'UK'},
      {value: 'Ireland', text: 'Ireland'},
      {value: 'Spain', text: 'Spain'},
      {value: 'France', text: 'France'}
    ])
    .constant('ConstAddressTypes', [
      {value: 'Home', text: 'Home'},
      {value: 'Office', text: 'Office'}
    ])
})(angular);
