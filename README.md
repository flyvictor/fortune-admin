fortune-admin
=============

Fortune admin is an angular component that provides a CRUD UI, and an ERD for a fortune instance. It's designed to be used as a bower module included in a host app, however for testing we also provide a node JS host app (examples/server.js) with a simple Angular/HTML container (examples/index.html).

## Start here : To run the example as a standalone app

* Depends on nodejs, mongodb (on OSX `brew install node mongodb`)

* cd into the root of this repository

* `git submodule update --init`

* `npm install -g bower`

* `bower install`

* cd into examples

* `npm install`

* `node server.js`

* open your browser, point it to `http://localhost:1337` (default) and navigate the interface; the top navigation has links to the UML

## To include the angular component as a plugin for existing app

* Add .css and .js fortune-admin files

* include `fortune-admin` to your app deps

* set mount point in your routes configuration

* add a menu link pointing to where you mount fortune-admin + '/uml'

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