'use strict';

/**
 * @ngdoc service
 * @name serviceQuizApp.brickWarehouse
 * @description
 * # brickWarehouse
 * Service in the serviceQuizApp.
 */
angular.module('serviceQuizApp')
  .service('brickWarehouse', function () {

  	var vm = this;

    this.redBricks = {
      '1x1': {
        quantity: 29,
        price: 0.01
      },
      '2x2': {
        quantity: 48,
        price: 0.03
      },
      '2x6': {
        quantity: 27,
        price: 0.05
      }
    };

    this.blueBricks = {
      '2x2': {
        quantity: 7,
        price: 0.02
      },
      '2x4': {
        quantity: 2,
        price: 0.04
      }
    };

    this.greenBricks = {
      '2x4': {
        quantity: 13,
        price: 0.04
      },
      '2x8': {
        quantity: 41,
        price: 0.08
      }
    };

    this.buy = function(color, size) {
    	// console.log("BUY " + color.toLowerCase() + "Bricks" + " " + vm[color.toLowerCase + "Bricks"]);
		vm[color.toLowerCase() + "Bricks"][size].quantity--;
      // brickWarehouse.buy(color, size);
    };

  });
