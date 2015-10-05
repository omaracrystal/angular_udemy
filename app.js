//angular is an object, module is a function, 'myApp' = name of app (convention to name it the same as the global variable), and []= array of dependances
//module
var myApp = angular.module('myApp', []);

//always set up a controller which is a function witin angular.js and we give it a name in the first argument
////this is a controller for the view
myApp.controller('mainController', function ($scope) {
  //model

  //this is angularJs doing dependancy injection - it's an object - the $ doesn't mean anything particular
  console.log($scope);

  //$scope is linking the view (html) with the model
  //you can add whatever keys and values to the scope object
  $scope.name = 'Jane Doe';
  $scope.occupation = 'Coder';
  //you can add functions to the scope object
  $scope.getname = function() {
    return 'John Doe';
  }
  //then you can call that function
  $scope.getname();


});

////////////////////////////////////////////////////////
// * $log * //
myApp.controller('mainController', function ($scope, $log) {
  //console.log
  $log.log('Hello');
  //encaptulates > $log enhances console.log
  $log.into("This is some information!");
  $log.warn("Warning");
  $log.debug("Some debug information while writing my code.");
  $log.error("This was an error!!!");

});


// * $filter * //
myApp.controller('mainController', function ($scope, $log, $filter) {

  $scope.name = 'John',
  $scope.formattedname = $filter('uppercase')($scope.name);
  $log.info($scope.name);
  $log.info($scope.formattedname);

});






//////////////* THIS IS HOW IT IS DONE *//////////////
//dependency and minification SOLVED!
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
  $log.info($scope);
}]);
//////////////* THIS IS HOW IT IS DONE *//////////////









myApp.controller2('mainController2', ['$scope', '$filter', function ($scope, $filter) {
  //model
  $scope.$watch('handle', function(newValue, oldValue) {
    console.info('Changed!');
    console.log('Old:' + oldValue);
    console.log('New:' + newValue);
  });

  setTimeout(function() {
    $scope.handle = 'newtwitterhandle';
    console.log('Scope Changed!');
  }, 3000);

}]);








////////////////////////////////////////////////////////
var Person= function(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

///////////////////not good practice
function logPerson() {
  //this function is dependant on this variable john
  var john = new Person('John', 'Doe');
  console.log(john);
}

logPerson();

///////////////////good practice
var john = new Person('John', 'Doe');

function logPerson(person) {
//function is no longer dependant on the variable john
  console.log(person);
}

//injecting the dependency this is what angular does!
logPerson(john);


////////////////////////////////////////////////////////


//instead of decaring a function we will name it to a variable for clarity sake
var searchPeople = function(firstname, lastname, height, age, occupation) {
  return 'Jane Doe';
}

//angular is object that has an ejector with a method called annotoate- and let's pass it the search People function
angular.injector().annotate(searchPeople);

//^^^ this above parses the function string and returns an array!
//['firstname', 'lastname', 'height', 'age', 'occupation']





