'use strict';

angular.module('myApp.createlist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:userId/createlist", {
    templateUrl: 'createList/createList.html',
    controller: 'createlist'
  });
}])

.controller('createlist', ['$scope', '$http', '_', 'Account', '$location', 'Item', function($scope, $http, _, Account, $location, Item) {
  $scope.currentUser = Account.getCurrentId();
  $scope.areToggled = [];

  $http.get('/api/recipes').then(function(response) {
    $scope.recipes = response.data;
  },
  function(error) {
    console.log(error);
  })

  $scope.isToggled = function(elem) {
    let id = elem.currentTarget.getAttribute('recipe-id');
    let pressed = elem.currentTarget.getAttribute('aria-pressed');
    id = parseInt(id);
    pressed === 'false' ? $scope.areToggled.push(id) : $scope.areToggled = _.without($scope.areToggled,id);
    console.log($scope.areToggled);
  }
  var listIngredients = [];
  $scope.createList = function() {
    for (var i=0; i<$scope.areToggled.length; i++) {
      listIngredients.push({recipeId: $scope.areToggled[i]});
    }
    console.log(listIngredients);
    Item.find({filter: {where: {or: listIngredients}}},
      function(res) {
        $scope.items = _.values(res);
        console.log($scope.items);
        $http.post('api/lists', {name: $scope.listName, recipes: $scope.items, accountId: $scope.currentUser}).then(function(response) {
          console.log(response.data.id);
          $scope.currentList = response.data.id;
          $location.path('/account/' +$scope.currentUser+ '/list/' +response.data.id);
        },
        function(error) {
          console.log(error);
        })
      },
      function(res) {
        console.log(res);
      }
    )

    // if are toggled is empty error at least 1 recipe must be chosen
    // if name is blank error list must have title
    // if clicked send to list 1 page and display all items in store categories
  }
}]);

// The list is then separated by position and when you delete all the items from one position
// the head representing position turns green with a checkbox
// with the one click delete feature maybe you could have a undo button at the top right that only undo's one time
