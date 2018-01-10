angular.module('myApp.navBar', [])
  .directive('navBar', function() {
    return {
      templateUrl: 'itemList/itemListDirective.html',
      replace:     true,
      scope: {
      },
      link: function(scope, element, attrs) {
        scope.name = attrs.name,
        scope.href = attrs.href,
        scope.icon = attrs.icon
      }
    }
  });
