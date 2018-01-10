'use strict';

angular.module('myApp.itemList', ['ngRoute','myApp.navBar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:userId/recipes/:id", {
    templateUrl: 'itemList/itemList.html',
    controller: 'itemList'
  });
}])

.controller('itemList', ['$scope', '$http', '_', 'Recipe', '$location', function($scope, $http, _, Recipe, $location) {
  $scope.currentRecipe = _.last($location.path().split('/'))
  $http.get('/api/items').then(function(response) {
    console.log(response.data);
    $scope.items = response.data;
  },
  function(error) {
    console.log(error);
  })

  $scope.addItem = function() {
    console.log($scope.quantity);
    console.log($scope.item);
    console.log($scope.selectedCategory);
    $http.post('/api/items', { "quantity": $scope.quantity, "name": $scope.inputItem, "category": $scope.selectedCategory, "recipeId": $scope.currentRecipe }).then(function(response) {
      $scope.inputItem= '';
      $scope.quantity = '';
      $http.get('/api/items').then(function(response) {
        $scope.items = response.data;
      },
      function(error) {
        console.log(error);
      })
    },
    function(error) {
      console.log(error);
    })
  }
  $scope.$watch('items', function () {
  }, true);

  $scope.categories = {
    One:'Baby Care',
    Two:'Beverages',
    Three:'Bread & Bakery',
    Four:'Breakfast & Cereal',
    Five:'Canned Goods & Soups',
    Six:'Condiments, Spices & Bake',
    Seven:'Cookies, Snacks & Candy',
    Eight:'Dairy, Eggs & Cheese',
    Nine:'Deli',
    Ten:'Frozen Foods',
    Eleven:'Fruits & Vegetables',
    Twelve:'Grains, Pasta & Sides',
    Thirteen:'International Cuisine',
    Fourteen:'Meat & Seafood',
    Fifteen:'Paper, Cleaning & Home',
    Sixteen:'Personal Care & Health',
    Seventeen:'Pet Care',
    Eighteen:'Wine, Beer & Spirits'
  }
}]);

// The list is then separated by position and when you delete all the items from one position
// the head representing position turns green with a checkbox
// with the one click delete feature maybe you could have a undo button at the top right that only undo's one time
