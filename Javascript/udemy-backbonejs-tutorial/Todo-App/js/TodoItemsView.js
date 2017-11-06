var TodoItemsView = Backbone.View.extend({
	id: "todoItemsContainer",
	
	initialize: function(options) {
		if(!(options && options.model))
			throw new Error("Model is not specified");

		this.model.on("add", this.onAddTodoItem, this);
		this.model.on("remove", this.onRemoveTodoItem, this);
	},

	onAddTodoItem: function(todoItem) {
		var todoItemView = new TodoItemView({ model: todoItem });
		this.$("#todoItems").append(todoItemView.render().$el);
	},

	onRemoveTodoItem: function(todoItem) {
		this.$("li#" + todoItem.id).remove();
	},

	events: {
		"keypress #newTodoItem": "onKeyPress"
	},

	onKeyPress: function(e) {
		if(e.keyCode == 13) {
			var $input = this.$('#newTodoItem');

			if($input.val()) {
				var todoItem = new TodoItem({ title: $input.val() });
				this.model.create(todoItem);

				$input.val("");
			}
		}
	},

	render: function() {
		var template = $("#todoItemsTemplate").html();
		var html = Mustache.render(template);
		this.$el.html(html);

		return this;
	}
});