'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/list", {
    templateUrl: 'view2/view2.html',
    controller: 'view2'
  });
}])

.controller('view2', ['$scope', '$http', '_', function($scope, $http, _) {
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

  $scope.items = [ 'Onion', 'Apple'];
}]);

// The list is then separated by position and when you delete all the items from one position
// the head representing position turns green with a checkbox
// with the one click delete feature maybe you could have a undo button at the top right that only undo's one time
