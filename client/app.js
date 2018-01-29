'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.recipe',
  'myApp.list',
  'myApp.createlist',
  'myApp.itemList',
  'myApp.signup',
  'myApp.login',
  'myApp.home',
  'myApp.profile',
  'myApp.version',
  'ngResource',
  'underscore',
  'lbServices'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);
