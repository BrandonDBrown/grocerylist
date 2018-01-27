'use strict';

describe('myApp.recipe module', function() {

  beforeEach(module('myApp.recipe'));

  describe('recipe controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var recipeCtrl = $controller('recipeCtrl');
      expect(recipeCtrl).toBeDefined();
    }));

  });
});