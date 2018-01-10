'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/login", {
    templateUrl: 'login/login.html',
    controller: 'login'
  });
}])

.controller('login', ['$scope', '$http', '_', 'Account', '$location', function($scope, $http, _, Account, $location) {
  $scope.loginUser = function() {
    Account.login({email: $scope.email, password: $scope.password},
      function(response) {
        console.log(response.user.id);
        $location.path('/account/' +response.user.id);
      },
      function(response) {
        $scope.error = response.data.error.message;
        console.log(response);
      }
    )
  }
}]);
