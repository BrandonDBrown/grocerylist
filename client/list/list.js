'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:userId/list/:listId", {
    templateUrl: 'list/list.html',
    controller: 'list'
  });
}])

.controller('list', ['$scope', '$http', '_', '$location', 'List', 'Item', function($scope, $http, _, $location, List, Item) {
  $scope.items = [];
  var listIngredients = [];
  $scope.currentlist = _.last($location.path().split('/'));
  $scope.toProfile = function() {
    $location.path('/account/' +$scope.currentUser);
  }

  List.find({filter: {where: {id: $scope.currentList}}},
    function(response) {
      console.log(response);
      $scope.stuff = response[0].recipes;
      for (var i=0; i<$scope.stuff.length; i++) {
        listIngredients.push($scope.stuff[i]);
      }
      console.log(listIngredients);
      $scope.items = listIngredients;
    },
    function(response) {
      console.log(response);
    }
  )

$scope.removeFromList = function(elem) {
  console.log(elem.currentTarget.getAttribute('name'));
  // _.without($scope.items, _.find($scope.items, ))
  // $scope.items = _.without($scope.items, );
  console.log($scope.items);
}

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
