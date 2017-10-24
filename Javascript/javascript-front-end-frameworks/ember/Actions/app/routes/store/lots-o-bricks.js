import Ember from 'ember';

export default Ember.Route.extend({
  warehouse: Ember.inject.service('brick-warehouse'),
  shoppingCart: Ember.inject.service('shopping-cart'),

  model() {
    return this.get('warehouse').getBricks();
  },

  actions: {
    addToCart(color, size, price) {
    	this.get('warehouse').hold(color, size);
		this.get('shoppingCart').addToCart(color, size, price);
	}
  }
});
