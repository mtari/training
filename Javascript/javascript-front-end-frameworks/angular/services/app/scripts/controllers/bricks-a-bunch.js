'use strict';

/**
 * @ngdoc function
 * @name serviceQuizApp.controller:BricksABunchCtrl
 * @description
 * # BricksABunchCtrl
 * Controller of the serviceQuizApp
 */
angular.module('serviceQuizApp')
  .controller('BricksABunchCtrl', ['brickWarehouse', function (brickWarehouse) {
    this.name = 'Bricks A Bunch';
    this.redBricks = brickWarehouse.redBricks;
    this.buy = function(color, size) {
      brickWarehouse.buy(color, size);
    };
}]);