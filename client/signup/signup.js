'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/signup", {
    templateUrl: 'signup/signup.html',
    controller: 'signup'
  });
}])

.controller('signup', ['$scope', '$http', '_', 'Account', function($scope, $http, _, Account) {
  $scope.signUpUser = function() {
    $scope.signUpResult = Account.create({email: $scope.email, password: $scope.password}, Account,
      function(err, token) {
        if (err) {
          $scope.error = "Not a valid email or password."
        } else {
          $scope.token = token.id;
        }
    })
  }
}]);
