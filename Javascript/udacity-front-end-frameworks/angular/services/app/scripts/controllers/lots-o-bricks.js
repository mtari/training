'use strict';

/**
 * @ngdoc function
 * @name serviceQuizApp.controller:LotsOBricksCtrl
 * @description
 * # LotsOBricksCtrl
 * Controller of the serviceQuizApp
 */
angular.module('serviceQuizApp')
  .controller('LotsOBricksCtrl', ['brickWarehouse', function (brickWarehouse) {
    this.name = 'Lots O Bricks';
    this.redBricks = brickWarehouse.redBricks;
    this.blueBricks = brickWarehouse.blueBricks;
    this.greenBricks = brickWarehouse.greenBricks;
    this.buy = function(color, size) {
      brickWarehouse.buy(color, size);
    };
  }]);