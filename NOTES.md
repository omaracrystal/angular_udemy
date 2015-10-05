# Angular.js Notes

## What is it?
It acts like a controler between Views and Models. It's shorter code to auto-update between the views and models based on updates from either side. This is called two-way or bi-directional binding. This allows for live template views.

Angular.js makes sure we do not polute the global variable name space.


### Steps to implement
1. go to https://angularjs.org/
   Develop > Download
       Pick latest version
           Find angular.js file- readable code
           Find angular.min.js- for quicker download, and saves a little bit more memory
       Copy link for angular.min.js input into script tags on html view page
1. Setup up index.html and app.js
1. In app.js start building angular.js app. Because we do not want to poplute the global variable name space, we are only going to set up one variable in the global name space. This variable is our app, our application.

```
//angular is an object, module is a function, 'myApp' = name of app (convention to name it the same as the global variable), and []= array of dependances
var myApp = angular.module('myApp', []);
```
1. MV* (MVC, MVVM, MVW) - Model View Whatever...
module = data and objects
We want the module to be connected to the view and update automatically
1. Tell angular where in the view the app.js lives, or what part of the view will be controlled by the app.js. This can be done by adding in the html file: ``ng-app="myApp"``
  - Let's add it to the top ``<html>`` tag for convienience! This is a custom attribute and links angular to the entire document to the variable in the global namespace. And from here that means that this app now has that view. So ng-app is what AngularJS looks for, and it looks at the value of that and matches that to a module name. In this case the variable name is the same as the module name (doesn't have to be). It's the string that is passed in the module function as the first argument is the name.
  - At this point, then, everything else we add, we're going to add to the myApp variable. Everything else will be underneath that object so it doesn't pollute the global namespace, and it will take advantage of all of the special things that an Angular module can do.
  - First thing (always) in app.js is to declare a controller:

```
//controller is a function witin angular.js and we give it a name in the first argument
////this is a controller for the view
myApp.controller('mainController', function () {

});
```

- Create no lets add ng-controller to a tag within the body of the html page.

```
<div class="container">

  <div ng-controller='mainController'>
  </div>

</div>
```

- Any code inside of the mainController function (in app.js) [called model] will be associated with controlling the HTML view inside of that tag.
- That is it! That is the bare bones of Angular.JS project

## Scope
1. Scope = object from the scope service and it uses Dependency Injections (see Javascript Aside)
1. Scope binds the models to the views and vice versa
1. $scope is a service that is part of the core of angular models and their are others as well
1. More testable, more sustainable more reliable

### **More Services** click below
[Angular API DOCS!](https://docs.angularjs.org/api)

## $filter guide
[$filter uses](**More Services**
[Angular API DOCS!](https://docs.angularjs.org/api)

```
{{ expression | filter }}
    {{ 12 | currency }}
    $12.00
```
Filters can be applied to the result of another filter. This is called "chaining" and uses the following syntax: ``{{ expression | filter1 | filter2 | ... }}``
Filters may have arguments. The syntax for this is:

```
{{ expression | filter:argument1:argument2:... }}

//E.g. the markup
{{ 1234 | number:2 }}
```
- Formats the number 1234 with 2 decimal points using the number filter. The resulting value is 1,234.00.


## Adding more modules to your application
1. add `<script>` code below original angularjs `<script>` tag in html
1. Then update the js file

```
// javascript array of dependences that you can add
var myApp = angular.module('myApp', ['ngMessages', 'nameOfmodule2', 'namofmodule3', etc]);
```
``ngMessages`` module does form validation
it shows in real time the messages!

```
<form name = "myForm">
  <input type='text' ng-model='field' name='myField' required minlength='5'/>
    <div ng-messages='myForm.myField.$error'>
      <div ng-message= 'required'>You did not enter a field
      </div>
      <div ng-message='minlength'>The value entered is too short
    </div>
</form>
```
1. Angular resource is a module that is called: ``ngResource`` (include script tag in html) This module allows for a quick reference

## Minification
1. Shrinking files
1. You can inject minification
1. Drop code into minifier and get the result
1. Takes variables and renames them to the smallest size it can, just one letter if it can.
1. Put if you use the minified version of your code within your app you will get errors. Why? Because angular coun't find the minified variables. Remember, AngularJS is based off dependency injection. Angular looks at the list of the perimeters as a **string** and tries to find the $ symbols to know which variables to use dependency injection. So minifying actually breaks AngularJS's dependency injection.
1. So what did AngularJS do to solve this?

```
//add array of elements
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
  $log.info($scope);
}]);
```
Adding a secound object as an array and add elements to the array then copying and pasting this code into an minifier will give you working code that Angular can now read. **Why? Because a minifier is never going to change the values inside a string.** It's never going to touch what is between two quotes, because that's something that you are explicity specifying in the code. However, at this point **order matters!** Angular will assign the first element to the virst variable undefined in the function, the secound element to the secound variable of the function... so on and so forth.
1. So the following could be:

```
myApp.controller('mainController', ['$scope', '$log', function(a, b) {
  $log.info(b);
}]);

// and b will be $log - order matters!
```

## Scope and Interpolation
1. Interpolation = creating a string by combining strings and placeholders
``'My name is' + name``
This is interpolated, and results in= ``'My name is Crystal'``
1. In AngularJS this works how?
  - instead of using jQuery to grab items from html file and manipulating the DOM by using such phrases as: ``innertext() or innerHTML() or contents() or text() etc``
we use Angular to and $scope service
  - So, the ``$scope`` service can attach variable names to, put data into the scope and functions as well

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
  $scope.name = 'Tony';
}]);
```
  - whatever is in the scope becomes available inside the view (html) > That is inside the HTML that is attached to the controller.

- One way of **interpolation** in AngularJS, is to take two curly braces {{ whatever you put here will be interpolated by AngularJS }} - {{ name }} just one word goes here that represents the variable to be called in the js file. $scope.name matches up with {{ name }}
- you can add stuff to the {{ name }} such as:
``{{ name + '. How are you?' }}``
**returns:** > ``"Hello Tony. How are you?"``

- Addint ``$timeout`` -- make sure ``$time`` lines up in the function too according to it's order in the array

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.name = 'Tony';

  $timeout(function() {

    $scope.name= 'Everybody';

  }, 3000);

}]);
```
> this automatically updated the data!


> *IMPORTANT!*
# Directives and Two Way Data Binding
1. Directive = an instruction to AngularJS to manipulate a piece of the DOM
- *this could be 'add a class', 'hide this', 'create this', etc.

```
<div class ='container'>
  <div>
    <label>What is your twitter handle?</label>
    <input type="text" />
  </div>

  <hr />

  <h1>twitter.com/<h1>

```
1. ``<hr />`` = horizontal rule in text box area
1. This appears as an form and a starting of a twitter handle url once HTML is launched on the server
1. How do we append the value of the input field to complete the twitter handle?
  - go to the js file and we are going to use a **directive** ... the first directives used were the ``ng-controller`` and the ``ng-app`` directives (custom attributes)
  - but we will be using our first **big time** directive where we will be specifying some kind of data. So going back to the HTML page we add: ``ng-model`` to the input tags:
``<input type="text" ng-model='handle'/>``

- this tells us that we want to *bind* this element to a specific property, a specific variable in the scope

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
  $scope.handle = '';

}]);
```
- *This is two way binding*
- now lets add it to the twitter url!

```
<div class ='container'>
  <div>
    <label>What is your twitter handle?</label>
    <input type="text" />
  </div>

  <hr />

  <h1>twitter.com/{{ handle }}<h1>

```
- **This auto updates in REAL TIME!!**
1. Now lets convert what ever is inputted by the user to lowercase

```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', function($scope, $filter) {
  $scope.handle = '';

  $scope.lowercasehandle = function() {
    return $filter('lowercase')($scope.handle);
  };

}]);
```
-Add ``$filter`` as a second option and as the second dependency injector of the function.
- Now add it to the HTML - remember you have to call a function!

```
<div class ='container'>
  <div>
    <label>What is your twitter handle?</label>
    <input type="text" />
  </div>

  <hr />

  <h1>twitter.com/{{ lowercasehandle() }}<h1>

```


## Watchers and the Digest Loop
(see JavaScript aside below= **'Event Loop'**)
1. AngularJs actually adds event listeners for you and it's **extending** the Event Loop, doing more with it in order to automatically control that binding between the model and the view.
1. AngularJS adds on **Angular Context**
  - so on top of the Event loop we have this entire context of everything going on witin the AngularJS architechture!
  - Agular Context adds = **Watchers** these watches wait for changes, just like eventListeners - and adds them to the **Digest Loop** *it's sort of like the the Event Loop, but it's it's own loop that angular has written*
1. If a watcher is triggered then the Digest Loop will pick up on that change and bring on the new value then update the DOM.
  - After one loop the digest cycle will check again to make sure none of those changes affected anything else. If it did, the cycle will continue until all of the old values and the new values match.
  - Not convention but here is how it could look:

```
$scope.$watch('handle', function(newValue, oldValue) {
  console.info('Changed!');
  console.log('Old:' + oldValue);
  console.log('New:' + newValue);

  setTimeout(function() {
    $scope.handle = 'newtwitterhandle';
    console.log('Scope Changed!');
  }, 3000);

});
```
- **Note:** the **timeout function** above only outputs the console.log and doesn't update the DOM. Why? Because this code is not built inside the AngularJS context. It never cycles through the watch list, and so it never updated the page. How can you fix that? See below:

```
$scope.$watch('handle', function(newValue, oldValue) {
  console.info('Changed!');
  console.log('Old:' + oldValue);
  console.log('New:' + newValue);

  setTimeout(function() {

    $scope.$appy(function() {
      $scope.handle = 'newtwitterhandle';
      console.log('Scope Changed!');
    }, 3000);

  });

});
```
1. First way to deal with this problem is to manually tell AngularJS that you are going to do a change here that should start a digest cycle: By adding .$apply within functions that deter the digest loop from cycling through such as timeout or external libraries

```
$scope.$apply(function() {
  ~do something
})
```
1. A second way to solve this is to inject the ``$timeout`` service into the array of the main controller:

```
my.App.controller('mainController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout)]) {
  $timeout(function) {
    $scope.handle= 'newtwitterhandle';
    console.log('Scope changed!');
  });
}, 3000);
```
- Because ``$timeout`` is an AngularJS service this qualifies as staying inside the AngularJS context. It's either ALL or NOTHING


## Common Directives
1. ``ng-if`` > If you want contraints you can add a new variable to the ``$scope``.characters = 5 / within in HTML add a tag with a true or false results

```
<div class="alert" ng-if="handle.length !== characters"> Must be 5 Characters </div>
```
1. ``ng-show`` - adds a new class ``ng-hide`` once it hides
   ``ng-hide`` - adds a new class ``ng-show`` once it shows

```
//Before showing:
<div class="alert" ng-show="handle.length !== characters"> Must be 5 Characters </div>

//After showing:
<div class="alert ng-hide" ng-show="handle.length !== characters"> Must be 5 Characters </div>
```
2. ``ng-class`` > what goes inside this class is a ``JSON object``. It takes a name of a class (in quotes) then the value would be an javaScript expression. The first part of the JSON object is the condition and the second part of the JSON object is the expression or event.

```
<div class="alert" ng-class="{'alert-warning' : handle.length < characters }"ng-show="handle.length !== characters"> Must be 5 Characters </div>
```
3. ``ng-repeat`` > used on lists

```
**HTML**
//rules is the name of the $scopt.rules
<ul>
  <li ng-repeat="rule in rules">
    //interpolate the output of the object created
    {{ rule.rulename }}
  </li>
</ul>

$scope.rules = [
    {rulename: "Must be 5 characters"},
    {rulename: "Must not be used elsewhere"},
    {rulename: "Must be cool"}
];

```
1. ``ng-click`` = ``alertClick()``

```
      $scope.alertClick = function () {
      alert("Clicked!")
    }
```
1. ``ng-cloak`` > hides ``{{ name }}`` from showing up on webpage until AngularJS has worked on it and replaces the value
1. Want more?! Click here >
[Directives](https://docs.angularjs.org/api/ng/directive)


## External Data and $http
1. ``$http`` service similar to XML HttpRequest but less code
1. inject ``$http`` into the controller funtion and add to the array

```
myApp.controller('mainController', ['$scope', '$filter', '$http' 'function ($scope, $filter, $http)

  $scope.handle = '';

  $scope.lowercasehandle = function () {
    return $filter('lowercase')($scope.handle);
  };

  $scope.characters = 5;

  // get address of api and upon success update the <li ng-repeat='rule in rules'> {{  rules.RuleName }} </ul>li> property area in the DOM

  $http.get('/api')
        .success(function(result) {
          $scope.rules = result;
        })
        .error(function (data, status) {
          console.log(data);
        })

//on HTML page let's add an inbox field to add a new rule
//Add rule:
  <input type="text" ng-model="newRule" /><a href = '#' class='btn btn-default' ng-click='addRule()'>Add</a>

  $scope.newRule = '';
  $scope.addRule = function () {
    //first where sending to and what you are sending (this case a JSON object with the name of the property and the value)

    //can add as many names and values as you like
    $http.post('/api', { newRule: $scope.newRule })
         .success(function (result) {
              $scope.rules = result;
              $scope.newRule = '';
         })
         .error(function (data, status) {
              console.log(data);
         })
  }
}]);
```
1. Now after adding a new rule by clicking the Add button, you can go in the inspector under Network tab and see that the api has a method of post. Click on that and notice that the adjacent object was sent, and there's the ``payload`` = ``newRule: 'Must be interesting'``
    - so it sent that string to the server, and then the server handled that. And if you go ahead and refresh the table you'll see the new value went into the database!

## Single Page Applications with AngularJS lession 27-28
### Routing Templates, and Controllers (part 1)
1. The location path is built into Angular, so it already knows what's in the hash. It has that stored

```
//just showing $location.path();
myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    $log.info($location.path());
}])
```
1. Go to angularJS.org > latest version > select another service > ``angular-route.js`` === this is going to help build single page applications.
  - ``angular-route.js`` = Module called ``ngRoute``.
  - This provides a couple different elements such as a routeProvider. It's a router, it's going to help us route whatever is in that hash then run the proper code and grab the proper HTML.
  - add ``minified version`` to script tag to html file below original angular script tag

```
var myApp = angular.module('myApp', ['ngRoute']);

//now that ngRoute is apart of the dependancies array, we have things available such as ".config" and "$routeProvider"
// config is a method that takes a function
myApp.config(function ($routeProvider) {
  //will find the html then bind it to the controller
  $routeProvider

  .when('/' {
    //pages= folder and main.html name of file
    //you can have many controllers
    templateUrl: 'pages/main.html',
    controller: 'mainController'
  })

  .when('/second' {
    templateUrl: 'pages/second.html',
    controller: 'secondController'
  })

})

myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {

}])
```

  - routeProvider lets us specify routes...in other words, what should we do when the hash '/' changes in the url... and it will also match patterns
  - then in the main index.html file you can add ``ng-view`` to any tag script area to reference the other html pages to incorporate.

```
        <li><a href='#'><i class='fa fa-home'></i>Home</a></li>
        <li><a href= '#/second'><i></i>Second</a></li>

    <div class='container'>
      <div ng-view></div>
    </div>
```

### Routing, Templates, and Controllers (part 2)
1. What if you want to give the page a value. For example query strings, where you put a question mark at the end of theURL and pass it values. How would you do that with a single page application
  - adding ``/:something`` << this is **pattern matching**
  - ``/:somthing`` once it sees that "something" it is going to get the value over in the controller - and we can inject **route params** (which is available because we have the ``ng-route`` module)

```
  myApp.controller('secondController' ['$scope','$log','$routeParams', function($scope, $log, $routeParams) {
    //put it in the scope so that it's available to the view
    $scope.something = $routeParams.something;
  }])

  //in html
  <h1>This is second page</h1>
  <h3>Scope route value (on second page): {{ something }}</h3>
```

  - in url **/index.htm#/second/333** <(can be anything doesn't have to match) because **it matched the pattern**
  - output: ``
    This is second.
    Scope route value (on second page): 333
``
    - now remember if you still want the ``/index.htm#/second`` to still exist, just set up another route and then update the controller that specifies the params and add an ``"||"`` or statement when it can't the params

```
  $scope.num = $route.Params.something || 1;
```
  - This is the preferred way for web applications now: faster, no blinking, download size is much smaller


## JavaScript and Angular Aside
### Singletons and Services
1. **singletons** = is the one and only cope of an object. It's a pattern in object oriented programming, and it means I only have one of these objects ever.
1. For example you can have a 'Person' object and there could be versions of that 'Person' object such as 'Crystal' object and a 'Bob' object --- but with a Singleton there will not be any copies.
1. AngularJS services are implemented as singletons.
1. When ``$log`` is injected into different controllers and new properties are given it crosses over to the next controller. This is called **singleton** it doesn't make a new copy of each instance of that $log property. However, with $scope in different controllers will reset the properties given for every controller. Is it still considered a singleton? That is $scope is the only exception to the rule, because it is a *child* of the $scope. They all inherit from the route ``$scope``. So the ``$scope`` object is refreshed for every controller. It's not exactly a singleton because of this.
1. When you create a service you are too creating a singleton

### Creating a service
1. Syntax

```
my.App.service('nameService' function() {
  //place the function that will contain all the method
  var self = this;

  this.name = 'John Doe';
  this.namelength = function () {
    return self.name.length;
  }
})

//how you add to controllers
my.App.controller('mainController', ['$scope', '$log', 'nameService', function($scope, $log, nameService) {
    $scope.name = 'Main';
    $log.log(nameService.name);
    $log.log(nameService.namelength());
}])
```

1. This new service = ``'nameService'`` will need to be injected in every controller you wish it to operate in. Also, you can add ``$watchers`` to the service to update across controllers. However, unless you have a way to **persist** data via cookie, local storage, database etc - once the page refreshes all updated information will revert to the original before the ``$watchers`` kicked in



## Scope and AngularJS Directives
1. You can access the scope set within the Parent Page or Parent Template

```
**HTML index/ Parent Page or Template/ $scope**
<label>Search</label>
<input type="text" value="Doe" />

<h3>Search Results</h3>
<div class="list group">
  //child directive
  <search-result></search-result>
</div>


**HTML Directive/ child**
<a href='#' class='list-groupitem'>
  <h4 class='list-group-item-heading'>
    {{ person.name }}
  </h4>
  <p class='list-group-item-text'>
    {{ person.address }}
  </p>
</a>


**JS**
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
  $scope.person - [
    name: 'John Doe'
    address: '555 Main St, New York, NY 1111'
  ]
}])
```

1. However this can be dangerous, because the directive could be doing things to items and elements on the scope that you don't want.

  -You have connected the scope for the parent page directly to the directive and the directive could then affect the data on the parent page. **So AngularJS provides a method to isolate the directive.**
1. **Isolated Scope** : just add this to the property to the directive object. This isolates the scope and gives it's own model and it's own view and now we're preventing accidental things from happening when using the directive on various pages.

```
**JS**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {

  }
  }
})
```

1. BUT HOW do you access parts of the scope in the directive. This is a child scope and has no affiliation with the scope that contains the directive.
1. AngularJS added a **solution** to poke holes through the walls that the isolated scope has put up; through attributes on the directive and normalization and three little symbols. This is done though **custom attributes** on the Parent Index page

```
**HTML Index/ Parent/ Main Scope**
<search-result person-name="{{ person.name }}" person-address= "{{ person.address }}"></search-result>

**JS**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personName: "@",
      personAddress: "@"
    }
  }
})

```
**symbols**
  - ``"@"`` = text > one-way binding
  - ``"="`` = object > two-way binding (careful!)
  - ``"&"`` = function >

```
**HTML Index/ Parent/ Main Scope**
<search-result person-object= "person"></search-result>

**HTML Directive/ child/ search results**
<a href='#' class='list-groupitem'>
  <h4 class='list-group-item-heading'>
    {{ personObject.name }}
  </h4>
  <p class='list-group-item-text'>
    {{ personObject.address }}
  </p>
</a>


**JS**
myApp.directive("searchResult", function() {
  return {
    restrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "="
    }
  }
});
```

1. **Functions** within the isolated scope

```
**HTML Index/ Parent/ Main Scope**
<search-result person-object= "person" formatted-address-function='foramttedAddress(aperson)'></search-result>

**HTML Directive/ child/ search results**
<a href='#' class='list-groupitem'>
  <h4 class='list-group-item-heading'>
    {{ personObject.name }}
  </h4>
  <p class='list-group-item-text'>
    //cannot pass through parameters need to add object { } / AKA JSON object
    //this is an object map
    {{ formattedAddressFunction({ aperson: personObject, other, properties, ifAny }) }}
  </p>
</a>

**JS - controller**
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {

  $scope.person = {
    name: 'John Doe',
    address: '555 Main St',
    city: 'New York',
    state: 'NY',
    zip: '11111'
  }

  $scope.formatted Address = function(person) {
    return person.address + ', ' + person.city + ', ' + person.state + ', ' + person.zip;
  }

}])

**JS - Directive and isolated scope**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "=",
      formattedAddressFunction: '&'
    }
  }
});
```

## Repeated Directive
1. ``ng-repeat`` = ``"person in people"``

```
**HTML Index/ Parent/ Main Scope**
  <search-result person-object= "person" formatted-address-function='foramttedAddress(aperson)' ng-repeat='person in people'></search-result>


**JS - controller**
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {

  $scope.people = [
    {
      name: 'John Doe',
      address: '555 Main St',
      city: 'New York',
      state: 'NY',
      zip: '11111'
    },
    {
      name: 'Jane Doe',
      address: '333 Secont St',
      city: 'Buffalo',
      state: 'NY',
      zip: '22222'
    },
    {
      name: 'James Doe',
      address: '111 Third St',
      city: 'Miami',
      state: 'FL',
      zip: '33333'
    }
  ]

  $scope.formatted Address = function(person) {
    return person.address + ', ' + person.city + ', ' + person.state + ', ' + person.zip;
  }

}])
```

## Understanding Compile and Link
1. ``**Compile**`` and ``**Link**`` > When building code, the compiler converts code to a lower-level language (ie: machine language), then the linker generates a file the computer will actually interact with.
> Very computer scienc-y terms that are sort of valid, but not familiar to many web developers **and NOT what AngularJS Does**

1. Creaters of AngularJs use these terms to talk about or to describe specific aspects of custom directives because they're kind of analogous... but not really ... just kind of similar theoritically
1. What does it really does? Inside the object that defines the directive we can add a new property called compile. Compile expects its value to be a function. This function will pass two parameters... in this case elem, atts. This function will return an object of links. In this case a pre-link and a post-link
1. Compiler takes the ``<a...></a>`` tag in child directive HTML page and everything inside of it
1. The ``pre`` and ``post`` links are happening 3 times because that's the ``'person in people'`` repeating each object onto the DOM -- and each time it has it's own scope.
1. You can have nested directives. The difference between **pre-link and post-link** = AngularJs actually compiles the directive then runs pre-link then looks for any other directives inside compiles that directive and runs pre-link so on and so forth.

```
**JS - Directive and isolated scope**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "=",
      formattedAddressFunction: '&'
    },
    compile: function(elem, attrs) {
      console.log('Compiling...')
      console.log(elem);

      return {
        pre: function(scope, elements, attrs) {
          console.log('Pre-linking...');
          console.log(elements);
        },
        post: function(scope, elements, atts) {
          console.log('Post-linking...');
          console.log(elements);
        },
      }
    }
  }
});
```

  > **NOTE:** AngularJS recommends not using pre link and just to use post link as much as possible. Since it's not that "safe"

- What can you do with post-link? Well with post, you have a template (the view), which is passed to the post link function, its elements, and the attributes on it as well, and have the model (scope). The scope for that particular instance of the directive. The thing that's actually about to be outputted to the HTML.
- All post link functions have to be in this order:

```
      post: function(scope, elements, attrs) {
          console.log('Post-linking...');
          console.log(elements);
          console.log(scope)
      }
```
  - You will see that the model will be printed (scope) then the view (elements)... this repeats 3 times because of the loop set up through the isolated scope.
  - Compile if you ever want to just change the HTML of the directive itself based for some reason. And we'll post link so that we can grab every instance the directive as it's created, look at the scope, look at the HTML elements that are part of it and make some decisions or make some changes before the HTML is outputted onto the DOM (outputted to the web page by the browser).
  - Better way of understanding compiling and post is to say I'm firest **initializing** the directive and **onbind** doing something. Every time I bind to a new scope, every time I bind the directive, the **onbind** function runs. But it's called compile and post
  - Now it's not very un-likely that you are going to have much code at all in the **compile** function. It's rare to have it period. And so AngularJS provides a short hand to this.

> There is a short hand to writing compile, return and post. This is more normal: ``link``
**symbols**
  - ``"@"`` = text > one-way binding
  - ``"="`` = object > two-way binding (careful!)
  - ``"&"`` = function >

```
**JS - Directive and isolated scope**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "=",
      formattedAddressFunction: '&'
    },

    link: function(scope, elements, atts) {
      console.log('Linking...');
      console.log(elements);
    },
  }
});
```

## Transclusion: Include one document inside another
### Place a copy of one document at a particular point inside another.
1. The note, on the main index HTML page: "*search results may not be valid", doesn't show up on the DOM because the directive overrides it. Now if you would like it to be included, this is called **transclusion**.
1. In the HTML Direct add the empty script tags: ``<ng-transclude></ng-transclude>`` or you can add it to the element tag ``<small ng-transclude></small>``
1. In the JS directive add the property **transclude: true** (the default is false)

```
**HTML Index/ Parent/ Main Scope**
  <search-result person-object= "person" formatted-address-function='foramttedAddress(aperson)' ng-repeat='person in people'>
    *search results may not be valid
  </search-result>

**HTML Directive/ child/ search results**
<a href='#' class='list-groupitem'>
  <h4 class='list-group-item-heading'>
    {{ personObject.name }}
  </h4>
  <p class='list-group-item-text'>
    {{ formattedAddressFunction({ aperson: personObject, other, properties, ifAny }) }}
  </p>
  <small><ng-transclude></ng-transclude></small>
</a>

**JS - Directive and isolated scope**
myApp.directive("searchResult", function() {
  return {
    retrict: 'AECM',
    templateUrl: 'directives/searchresult.html',
    replace: true,
    scope: {
      personObject: "=",
      formattedAddressFunction: '&'
    },
    transclude: true
  }
});
```


## Angular Aside
1. Multiple Controllers, Multiple Views
   - ``$scope`` objects can be unique to each unique controller name and have the same name of a scope object. such as > ``{{ name }}``


## Javascript Aside
1. **Dependency Injection**: rather than creating an object inside a function, you pass it to the function
1. Arrays can contain: strings, numbers, functions, objects, etc etc

```
var things= [
              1,
              '2',
              function() {
                alert('Hello');
              }
            ];
//calling the function through the array
things[2]();
```

1. **The Event Loop**
  - Waits for events and then throws them into a loop.
  - (empty text boxes with an event listener will acknowledge each keypress event)

```
textBox.addEventListener('keypress', function(event){
  console.log('Pressed!');
});
```

1. **XMLHttpRequest** Object
  - Want to pull information from the database and have it append to the DOM?
     - You will need to call the API and that's where the XMLHttpRequest object comes into play!
     - Let's get rid of the rules array and create a new variable and will become a new XML object ``var rulesrequest = new XMLHttpRequest();``
    - in code you can make an http request and go do something with that data
    - Sort of complex to use that is why most frameworks have wrapper around it... jQuery has Ajax wrapper and AngularJS has it's own wrapper around the httpRequest object.
    - make sure to wrap whatever you do in Angular context by wrapping with ``$scope.$apply(function() {})``
    - make sure the name of the database matches the area on html ``{{ rule.RuleName }}``

```
var rulesrequest = new XMLHttpRequest();
rulesrequest.onreadystatechange = function() {

  $scope.$apply(function () {
    if (rulesrequest.readyState == 4 && rulesquest.status == 200) {
      //response text
      //comes back as a nice array of rules
      $scope.rules = JSON.parse(rulesrequest.responseText);
    }
  })

  //run it to grab data from api url
  rulesrequest.open('GET', 'http://localhost:54765/api', true);
  rulesrequest.send();
}
```

** That's cool and all but now lets make this even simpler by **putting a wrapper around it** ``$http`` object (see above = External Data and $http)

## HTML and Javascript Aside
### Single Page Apps and the Hash
1. Loads all HTML page all at once
1. **fragment identifier** (which is also the id) To jump to different parts of the single page application you can call it by it's ID from the top

```
//html on top
<a href="#bookmark">Go to Bookmark</a>

//app.js
window.addEventListener('hashchange' function() {

//essencially fake url here but behave as url
  if(window.location.hash === '#/bookmark/1') {
    console.log('Page 1 is cool.')
  }
  if(window.location.hash === '#/bookmark/2') {
    console.log('Here is page 2')
  }
  if(window.location.hash === '#/bookmark/3') {
    console.log('Here is page 3')
  }

})
```

1. This updates the url to ....#/bookmark/1


### Variable Names and Normalization
1. **Normalize** - to make consistent to a standard. Specifically we are dealing with 'text normalization', or making strings of text consistent to a standard
1. What is this? When we talk about buiding our own **HTML reusable components AKA element directives** in this case in AngularJS.

```
<search-result result-link-href='#'></search-result>
```
1. Put a dash between each word, and it's all lower case. (bootstrap does that) - use this standard creating our own components
1. Typically their will be variables in JS that match up with the attributes, elements and class-names that could be in the HTML.
    - The problem is that the **'-'** in html **'are minus characters in JS'**
    - Angular normalization will converts strings of HTML elements, class, etc to variable names using camel case. HTML = ``learn-and-understand`` and JS = ``learnAndUnderstand``

### Creating a Directive
1. Let's create a directive for the results page
1. **templates** are tied to controllers in HTML. It is what is outputted when the directive is used.

```
**HTML**
<label>Search</lable
<input type= 'text' value='Doe'/>
<h3>Search Results</h3>
<div class='list-group'>
  <a href='#' class='list-groupitem'>
    <h4 class='list-group-item-heading'>Doe, John</h4
    <p class='list-group-item-text'>
    555 Main St, New York, NY 11111
    </p>
  </a>
</div>

**JS**
myApp.directive('searchResult', function() {
  return {
    template: '<a href='#' class='list-groupitem'><h4 class='list-group-item-heading'>Doe, John</h4><p class='list-group-item-text'>555 Main St, New York, NY 11111</p></a>'
  }
})

**NEW HTML**
<label>Search</lable
<input type= 'text' value='Doe'/>
<h3>Search Results</h3>
<div class='list-group'>
  <search-result></search-result>
</div>
```

  - Now bootstrap will get confused with the new naming convention so this is how we can fix that by adding ``replace: true`` - by default it is ``false``
  - This ``replace: true`` says to find the directive and completely replace it with what the results of the template are.
  - when inspecting the element you will no longer see the ``<search-result>`` tags it will just be the template.
  - this allows you more flexibility with repeated items and for updating these repeated templates.

```
**JS**
myApp.directive('searchResult', function() {
  return {
    template: '<a href='#' class='list-groupitem'><h4 class='list-group-item-heading'>Doe, John</h4><p class='list-group-item-text'>555 Main St, New York, NY 11111</p></a>'

    replace: true
  }
})
```

1. This is not the only way to create a custom directive. You can a custom attribute to a normal element like this:

```
**NEW HTML**
<label>Search</lable
<input type= 'text' value='Doe'/>
<h3>Search Results</h3>
<div class='list-group'>
  <search-result></search-result>
  <div search-result></div>
</div>
```

  - This will insert the template into the div area if replace is false and replace the div tag if replace is true

1. You can add ``restrict`` to the directive. This will ignore parts of the template except for what is mentioned. AE are on by default. If you wanted to add others:
1. Single short hand for names:

```
  - Element = E
  - Attribute = A
  - Class = C
  - Comments = M
```
.

```
**JS**
myApp.directive('searchResult', function() {
  return {
    //what will be "on"/ restrict to see 'AECM'
    restrict: 'AECM',

    template: '<a href='#' class='list-groupitem'><h4 class='list-group-item-heading'>Doe, John</h4><p class='list-group-item-text'>555 Main St, New York, NY 11111</p></a>'

    replace: true
  }
})
```

- The template area can get congested and hard to read > to fix this you can can replace. You can create separate js and html folders for this custom directives. Reusable and easier to deal with. ``templateUrl: 'directives/searchresult.html'``


## HTML Aside
### Reusable Components
1. Web components= custom directives
1. Being able to create own tags.
