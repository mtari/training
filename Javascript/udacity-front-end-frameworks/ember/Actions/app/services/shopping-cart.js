import Ember from 'ember';

export default Ember.Service.extend({
	cart: [],

	addToCart(color, size, price) {
		this.get('cart').push({color: color, size: size, price: price});
		console.log("TEST addToCart " + color + " " + size + " " + price);
		console.log(this.get('cart'));
	},

	getCart() {
		return this.get('cart');
	}
});
