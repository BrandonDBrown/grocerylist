'use strict';

angular.module('myApp.itemList', ['ngRoute','myApp.navBar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:userId/recipes/:id", {
    templateUrl: 'itemList/itemList.html',
    controller: 'itemList'
  });
}])

.controller('itemList', ['$scope', '$http', '_', 'Recipe', '$location', 'Account', 'Item', function($scope, $http, _, Recipe, $location, Account, Item) {
  $scope.currentRecipe = _.last($location.path().split('/'));
  console.log($scope.currentRecipe);
  $scope.currentUser = Account.getCurrentId();

  Item.find({filter: {where: {recipeId: $scope.currentRecipe}}},
    function(response) {
      $scope.items = response;
      console.log(response);
    },
    function(response) {
      // console.log(response);
    }
  )
  // $http.get('/api/items', { where: {recipeId: $scope.currentRecipe}}).then(function(response) {
  //   console.log(response.data);
  //   $scope.items = response.data;
  // },
  // function(error) {
  //   console.log(error);
  // })

  $scope.addItem = function() {
    console.log($scope.quantity);
    console.log($scope.item);
    console.log($scope.currentRecipe);
    $http.post('/api/items', { "quantity": $scope.quantity, "name": $scope.inputItem, "category": $scope.selectedCategory, "recipeId": $scope.currentRecipe }).then(function(response) {
      $scope.inputItem= '';
      $scope.quantity = '';
      Item.find({filter: {where: {recipeId: $scope.currentRecipe}}},
        function(response) {
          $scope.items = response;
          console.log(response);
        },
        function(response) {
          console.log(response);
        }
      )
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
    Three:'Bread and Bakery',
    Four:'Breakfast and Cereal',
    Five:'Canned Goods and Soups',
    Six:'Condiments, Spices and Bake',
    Seven:'Cookies, Snacks and Candy',
    Eight:'Dairy, Eggs and Cheese',
    Nine:'Deli',
    Ten:'Frozen Foods',
    Eleven:'Fruits and Vegetables',
    Twelve:'Grains, Pasta and Sides',
    Thirteen:'International Cuisine',
    Fourteen:'Meat and Seafood',
    Fifteen:'Paper, Cleaning and Home',
    Sixteen:'Personal Care and Health',
    Seventeen:'Pet Care',
    Eighteen:'Wine, Beer and Spirits'
  }
}]);

// The list is then separated by position and when you delete all the items from one position
// the head representing position turns green with a checkbox
// with the one click delete feature maybe you could have a undo button at the top right that only undo's one time
