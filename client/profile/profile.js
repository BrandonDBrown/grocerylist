'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/account/:id", {
    templateUrl: 'profile/profile.html',
    controller: 'profile'
  });
}])

.controller('profile', ['$scope', '$http', '_', 'Account', function($scope, $http, _, Account) {
  $scope.currentUser = Account.getCurrentId();
}]);
