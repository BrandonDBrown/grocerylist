'use strict';

angular.module('myApp.recipe', ['ngRoute', 'underscore'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/:userId/recipes', {
    templateUrl: 'recipe/recipe.html',
    controller: 'recipeCtrl'
  });
}])

.controller('recipeCtrl', [ '$scope', '$http', '_', 'Account', '$location', function($scope, $http, _, Account, $location) {
  $scope.currentUser = Account.getCurrentId();
  $scope.toProfile = function() {
    $location.path('/account/' +$scope.currentUser);
  }
  console.log($scope.currentUser);
  $http.get('/api/recipes').then(function(response) {
    $scope.recipes = response.data;
  },
  function(error) {
    console.log(error);
  })

  $scope.addRecipe = function() {
    $http.post('/api/recipes', { "title": $scope.title, "description": $scope.description, "accountId": $scope.currentUser }).then(function(response) {
      $scope.title = '';
      $scope.description = '';
      $http.get('/api/recipes').then(function(response) {
        $scope.recipes = response.data;
      },
      function(error) {
        console.log(error);
      })
    },
    function(error) {
      console.log(error);
    })
  }
  $scope.$watch('recipes', function () {
  }, true);
}]);


// Create List
// Select Recipes
// Remove Items
// Grocery List
//
// Create Recipe
// - Recipe has a title and description
// - Recipes have many items
// Create Item
// - Items (name, quantity, store placement)
// Maybe have little graphics before you add to a  list that show three rectangles that
// signify left, center, right general positions of items in the store
// what is the best wait to add items. Freeform? need to find a way to match onion, Onion, onions, Onions, Onoin
// Pre defined list plus custom items.
// Maybe it can be free form but after save it says did you mean Onion instead of onions?
