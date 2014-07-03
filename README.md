fortune-admin
=============

## Running as a plugin for existing app

1) Add .css and .js fortune-admin files

2) include `fortune-admin` to your app deps

3) set mount point in your routes configuration

4) add a menu link pointing to where you mount fortune-admin + '/uml'

```js

    angular.module('yourApp', [
       'ngRoute',
       'fortuneAdmin'
    ])
     .config('$routeProvider', '$locationProvider', 'fortuneAdminProvider',
      function($routeProvider, $locationProvider, fortuneAdminProvider){
        //Your routes go here.

        //1. Point plugin to your running fortune service
        fortuneAdminProvider.setApiHost('http://some.other.host.com');
        //2. Provide api namespace as configured in fortune
        fortuneAdminProvider.setApiNamespace('/api/v2');
        //3. Mount plugin to any route of your choice
        fortuneAdminProvider.mountTo($routeProvider, '/admin');
        //optional 4. If you're running the app standalone use this to render native navbar
        //There's no need to manually set up navbar in this case
        fortuneAdminProvider.enableNavbar();

        //fortune-admin defaults to use html5Mode
        $locationProvider.html5Mode(true);
     });
```

## Pluggable menu

There are two directives that allow you to integrate navbars and make use of fortune-admin as a plugin simple and fun.

`<fortune-admin-resources-cells></fortune-admin-resources-cells>` this will insert resources dropdown with `<li>` as a root element

`<fortune-admin-uml-cells></fortune-admin-uml-cells>` this will insert simple link to UML diagram. Again, the root element is `<li>`

See /src/templates/views/mynavbar.html for usage example

## Running with html5Mode disabled

fortuneAdminProvider has html5Mode method which accepts a boolean and optional hash prefix

```js

     fortuneAdminProvider.html5Mode(false, '!');
     $locationProvider.hashPrefix('!');

```

To run example: `node examples/dev_server.js`

git clone
git submodule init
git submodule update
cd lib/fortune
npm install
cd ../../
bower install
cd examples
npm install
node examples/dev_server.js

fortune-admin depends on d3, ui.bootstrap and angular-xeditable.
You can either provide deps yourself or take fortune-admin.vendor.js file.