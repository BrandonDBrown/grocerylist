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
  $scope.strike = false;
  var listIngredients = [];
  var quantity = 0;
  $scope.currentUser = Account.getCurrentId();
  $scope.currentList = _.last($location.path().split('/'));

  List.find({filter: {where: {id: $scope.currentList}}},
    function(response) {
      var stuff = response[0].recipes;
      for(var i=0; i<stuff.length; i++) {
        if(_.where(stuff, {name: stuff[i].name, category: stuff[i].category}).length > 1) {
          var dups = _.where(stuff, {name: stuff[i].name, category: stuff[i].category});
          for(var x=0;x<dups.length; x++) {
            stuff = _.without(stuff, dups[x]);
            quantity = quantity + dups[x].quantity;
            dups[0].quantity = quantity;
          }
          stuff.push(dups[0]);
        };
      }
      $scope.items = stuff;
      $scope.categories = _.without(_.uniq(_.pluck(stuff, 'category')), undefined);
    },
    function(response) {
      console.log(response);
    }
  )


  $scope.strikeMe = function(event) {
    // List.upsert({ id: 1, recipes: [{ name: event.currentTarget.innerText, quantity: 5 }] } , function(err, obj) {
    //   console.log(err);
    //   console.log(obj);
    // })
    var name = angular.element(event.target).closest('h6')[0].childNodes[0].data;
    var remove = _.where($scope.items, {name: name});
    var undo = _.where($scope.items, {name: name});
    console.log(remove);
    $scope.items = _.without($scope.items, remove[0]);
  }
  $scope.undoMe = function(event) {
    // List.upsert({ id: 1, recipes: [{ name: event.currentTarget.innerText, quantity: 5 }] } , function(err, obj) {
    //   console.log(err);
    //   console.log(obj);
    // })
    var undo = _.where($scope.items, {name: name});
    $scope.items.push(undo);
  }
}]);
