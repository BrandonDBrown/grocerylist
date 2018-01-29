'use strict';

angular.module('myApp.home', ['ngRoute', 'underscore'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: 'home/home.html',
    controller: 'home'
  });
}])

.controller('home', ['$scope', '$http', function($scope, $http) {

}]);
