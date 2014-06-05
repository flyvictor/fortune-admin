fortune-admin
=============

## Running as a standalone app

1) npm install

2) bower install

3) node app.js [port]

4) open your browser

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

        //fortune-admin defaults to use html5Mode
        $locationProvider.html5Mode(true);
     });
```

## Running with html5Mode disabled

fortuneAdminProvider has html5Mode method which accepts a boolean and optional hash prefix

```js

     fortuneAdminProvider.html5Mode(false, '!');
     $locationProvider.hashPrefix('!');

```


See examples/sampleApp for 'full-featured' app using plugin.

To run example:
```
    $ bower install
    $ cd examples/
    $ npm install
    $ node server.js
```

To run dev server that serves uncompressed files run `examples/dev_server.js` instead of `examples/server.js`

fortune-admin depends on d3, ui.bootstrap and angular-xeditable.
You can either provide deps yourself or take fortune-admin.vendor.js file.