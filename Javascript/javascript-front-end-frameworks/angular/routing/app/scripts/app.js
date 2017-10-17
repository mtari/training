'use strict';

/**
 * @ngdoc overview
 * @name routingQuizApp
 * @description
 * # routingQuizApp
 *
 * Main module of the application.
 */
angular
  .module('routingQuizApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  	$urlRouterProvider.otherwise('/');

  	$stateProvider
  		.state('homeLink', {
  			url: '/',
  			templateUrl: 'views/instructions.html'
  		})
  		.state('redBrickLink', {
  			url: '/bricks/red',
  			templateUrl: 'views/bricks.html',
  			controller: 'RedBricksCtrl as brick'
  		})
      .state('redBrickLink.cart', {
        url: '/cart',
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl as cart'
      })
  		.state('blueBrickLink', {
  			url: '/bricks/blue',
  			templateUrl: 'views/bricks.html',
  			controller: 'BlueBricksCtrl as brick'
  		})
  		.state('greenBrickLink', {
  			url: '/bricks/green',
  			templateUrl: 'views/bricks.html',
  			controller: 'GreenBricksCtrl as brick'
  		})
  		.state('cartLink', {
  			url: '/cart',
  			templateUrl: 'views/cart.html',
  			controller: 'CartCtrl as cart'
  		});
  }]);
