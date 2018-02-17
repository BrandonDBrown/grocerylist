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
    // console.log(event.currentTarget.innerText);
    // List.upsert({ id: 1, recipes: [{ name: event.currentTarget.innerText, quantity: 5 }] } , function(err, obj) {
    //   console.log(err);
    //   console.log(obj);
    // })

    // console.log(event.parentTarget.getAttribute('class'))
    if(event.currentTarget.getAttribute('class').includes('strike')){
      $(event.target).removeClass("strike");
    } else {
      $(event.target).addClass("strike");
    }
  }

//   console.log(elem.currentTarget.getAttribute('class'));
//   // _.without($scope.items, _.find($scope.items, ))
//   // $scope.items = _.without($scope.items, );
//   console.log($scope.items);
// }



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
