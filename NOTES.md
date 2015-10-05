#Angular.js Notes

##What is it?
It acts like a controler between Views and Models. It's shorter code to auto-update between the views and models based on updates from either side. This is called two-way or bi-directional binding. This allows for live template views.

Angular.js makes sure we do not polute the global variable name space.


###Steps to implement
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
1. Tell angular where in the view the app.js lives, or what part of the view will be controlled by the app.js. This can be done by adding in the html file:
```
ng-app="myApp"
```
Let's add it to the top <html> tag for convienience! This is a custom attribute and links angular to the entire document to the variable in the global namespace. And from here that means that this app now has that view. So ng-app is what AngularJS looks for, and it looks at the value of that and matches that to a module name. In this case the variable name is the same as the module name (doesn't have to be). It's the string that is passed in the module function as the first argument is the name.
1. At this point, then, everything else we add, we're going to add to the myApp variable. Everything else will be underneath that object so it doesn't pollute the global namespace, and it will take advantage of all of the special things that an Angular module can do.
1. First thing (always) in app.js is to declare a controller.
```
//controller is a function witin angular.js and we give it a name in the first argument
////this is a controller for the view
myApp.controller('mainController', function () {

});
```

1. Create no lets add ng-controller to a tag within the body of the html page.

```
<div class="container">

  <div ng-controller='mainController'>
  </div>

</div>
```

1. Any code inside of the mainController function (in app.js) [called model] will be associated with controlling the HTML view inside of that tag.
1. That is it! That is the bare bones of Angular.JS project

## Scope
1. Scope= object from the scope service and it uses Dependency Injections (see Javascript Aside)
1. Scopt is binds the models to the views and vice versa
1. $scope is a service that is part of the core of angular models and their are others as well
1. More testable, more sustainable more realiable

**More Services**
[Angular API DOCS!](https://docs.angularjs.org/api)

## $filter guide
[$filter uses](**More Services**
[Angular API DOCS!](https://docs.angularjs.org/api)
```
{{ expression | filter }}
    {{ 12 | currency }}
    $12.00
```
Filters can be applied to the result of another filter. This is called "chaining" and uses the following syntax:
```
{{ expression | filter1 | filter2 | ... }}
```
Filters may have arguments. The syntax for this is
```
{{ expression | filter:argument1:argument2:... }}

//E.g. the markup
{{ 1234 | number:2 }}
```
formats the number 1234 with 2 decimal points using the number filter. The resulting value is 1,234.00.


## Adding more modules to your application
1. add <script> code below original angularjs <script> tag in html
1. Then update the js file
```
// javascript array of dependences that you can add
var myApp = angular.module('myApp', ['ngMessages', 'nameOfmodule2', 'namofmodule3', etc]);
```
**ngMessages** module does form validation
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
1. Angular resource is a module that is called:
```
ngResource
```
(include script tag in html)
This module allows for a quick reference for

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
```
'My name is' + name
```
This is interpolated, and results in= 'My name is Crystal'
1. In AngularJS this works how?
- instead of using jQuery to grab items from html file and manipulating the DOM by using such phrases as: *innertext() or innerHTML() or contents() or text() etc*
we use Angular to and $scope service
- So, the $scope service can attach variable names to, put data into the scope and functions as well
```
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
  $scope.name = 'Tony';
}]);
```
- whatever is in the scope becomes available inside the view (html) > That is inside the HTML that is attached to the controller.
1. One way of **interpolation** in AngularJS, is to take two curly braces {{ whatever you put here will be interpolated by AngularJS }} - {{ name }} just one word goes here that represents the variable to be called in the js file. $scope.name matches up with {{ name }}
- you can add stuff to the {{ name }} such as:
```
{{ name + '. How are you?' }}
```
**returns: > "Hello Tony. How are you?"**

1. Addint $timeout -- make sure $time lines up in the function too according to it's order in the array
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


# *IMPORTANT!*
# Directives and Two Way Data Binding
1. Directive = an instruction to AngularJS to manipulate a piece of the DOM
- *this could be 'add a class', 'hide this', 'create this', etc.
```
<div class ='container'>
  <div>
    <label>What is your twitter hangle?</label>
    <input type="text" />
  </div>

  <hr />

  <h1>twitter.com/<h1>

```
1. <hr /> = horizontal rule in text box area
1. This appears as an form and a starting of a twitter handle url once HTML is launched on the server
1. How do we append the value of the input field to complete the twitter handle?
- go to the js file and we are going to use a **directive** ... *the first directives used were the ng-controller and the ng-app directives (custom attributes)*
- but we will be using our first **big time** directive where we will be specifying some kind of data. So going back to the HTML page we add: ng-model to the input tags:

```
  <input type="text" ng-model='handle'/>
```

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
    <label>What is your twitter hangle?</label>
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
-Add $filter as a second option and as the second dependency injector of the function.
- Now add it to the HTML - remember you have to call a function!
```
<div class ='container'>
  <div>
    <label>What is your twitter hangle?</label>
    <input type="text" />
  </div>

  <hr />

  <h1>twitter.com/{{ lowercasehandle() }}<h1>

```


## Watchers and the Digest Loop
(see JavaScript aside below= **'Event Loop'**)
1. AngularJs actually adds event listeners for you and it's **extending** the Event Loop, doing more with it in order to automatically control that binding between the model and the view.
1. AngularJS adds on **Angular Context**
-so on top of the Event loop we have this entire context of everything going on witin the AngularJS architechture!
- Agular Context adds = **Watchers** these watches wait for changes, just like eventListeners - and adds them to the **Digest Loop** *it's sort of like the the Event Loop, but it's it's own loop that angular has written*
1. If a watcher is triggered then the Digest Loop will pick up on that change and bring on the new value then update the DOM.
- After one loop the digest cycle will check again to make sure none of those changes affected anything else. If it did, the cycle will continue until all of the old values and the new values match.

-

## Javascript Aside
1. Dependency Injection: rather than creating an object inside a function, you pass it to the function
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
1. *The Event Loop*
- Waits for events and then throws them into a loop.
- (empty text boxes with an event listener will acknowledge each keypress event)
*textBox.addEventListener('keypress', function(event){
  console.log('Pressed!');
});
