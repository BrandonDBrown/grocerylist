'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:id", {
    templateUrl: 'profile/profile.html',
    controller: 'profile'
  });
}])

.controller('profile', ['$scope', '$http', '_', 'Account', 'List', function($scope, $http, _, Account, List) {
  $scope.currentUser = Account.getCurrentId();
  console.log($scope.currentUser);
  List.find({filter: {where: {accountId: $scope.currentUser}}},
    function(response) {
      console.log(response);
      $scope.lists = response.reverse();
    },
    function(error) {
      console.log(error);
  })
}]);
