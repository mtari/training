/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, `completed` and `priority` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title`, `completed` and `priority` keys.
		defaults: {
			title: '',
			completed: false,
			priority: 0,
			archived: false
		},

		// Toggle the `completed` state of this todo item.
		toggleCompleted: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		// Toggle the `priority` state of this todo item.
		setPriority: function (value) {
			console.log("setPriority " + value);
			this.save({
				priority: value
			});
		},

		// Toggle the `priority` state of this todo item.
		toggleArchived: function () {
			this.save({
				archived: !this.get('archived')
			});
		}
	});
})();
