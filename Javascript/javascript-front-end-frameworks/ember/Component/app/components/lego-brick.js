import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['col-sm-4', 'well'],
	classNameBindings: ['onSale:on-sale']
});
