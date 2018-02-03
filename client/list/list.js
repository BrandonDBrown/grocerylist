'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:userId/list/:listId", {
    templateUrl: 'list/list.html',
    controller: 'list'
  });
}])

.controller('list', ['$scope', '$http', '_', '$location', 'List', 'Item', 'Account', function($scope, $http, _, $location, List, Item, Account) {
  $scope.items = [];
  var listIngredients = [];
  $scope.currentUser = Account.getCurrentId();
  $scope.currentlist = _.last($location.path().split('/'));

  List.find({filter: {where: {id: $scope.currentList}}},
    function(response) {
      console.log($scope.currentlist);
      $scope.stuff = response[$scope.currentlist-1].recipes;
      console.log($scope.stuff);
      for (var i=0; i<$scope.stuff.length; i++) {
        listIngredients.push($scope.stuff[i]);
      }
      $scope.items = listIngredients;
      console.log(listIngredients);
      $scope.categories = _.without(_.uniq(_.pluck(listIngredients, 'category')), undefined);
      console.log($scope.categories);
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



  // $scope.categories = {
  //   One:'Baby Care',
  //   Two:'Beverages',
  //   Three:'Bread and Bakery',
  //   Four:'Breakfast and Cereal',
  //   Five:'Canned Goods and Soups',
  //   Six:'Condiments, Spices and Bake',
  //   Seven:'Cookies, Snacks and Candy',
  //   Eight:'Dairy, Eggs and Cheese',
  //   Nine:'Deli',
  //   Ten:'Frozen Foods',
  //   Eleven:'Fruits and Vegetables',
  //   Twelve:'Grains, Pasta and Sides',
  //   Thirteen:'International Cuisine',
  //   Fourteen:'Meat and Seafood',
  //   Fifteen:'Paper, Cleaning and Home',
  //   Sixteen:'Personal Care and Health',
  //   Seventeen:'Pet Care',
  //   Eighteen:'Wine, Beer and Spirits'
  // }
}]);

// The list is then separated by position and when you delete all the items from one position
// the head representing position turns green with a checkbox
// with the one click delete feature maybe you could have a undo button at the top right that only undo's one time
