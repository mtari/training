/**
 * Creating views
**/

// var SongView = Backbone.View.extend({
// 	tagName: "span",

// 	className: "song",

// 	id: "1234",

// 	attributes: {
// 		"data-genre": "jazz"
// 	},

// 	render: function() {
// 		this.$el.html("Hello world");
// 		return this;
// 	}
// });

//creating view
// var songView = new SongView({ el: "#container" });

//Or
// var songView = new SongView();
// songView.render();
// $("#container").html(songView.$el);





/**
 * Passing data to views
**/

//Passing model
// var Song = Backbone.Model.extend();

// var SongView = Backbone.View.extend({
// 	tagName: "span",

// 	className: "song",

// 	id: "1234",

// 	attributes: {
// 		"data-genre": "jazz"
// 	},

// 	render: function() {
// 		this.$el.html(this.model.get("title"));
// 		return this;
// 	}
// });

// var song = new Song({ title: "Blue in Green" });

// var songView = new SongView({ el: "#container", model: song });
// songView.render();

//Passing collection
// var Song = Backbone.Model.extend();

// var Songs = Backbone.Collection.extend({
// 	model: Song
// })

// var SongView = Backbone.View.extend({
// 	tagName: "li",

// 	render: function() {
// 		this.$el.html(this.model.get("title"));
// 		return this;
// 	}
// });

// var SongsView = Backbone.View.extend({
// 	render: function() {
// 		var self = this;
// 		this.model.each(function(song) {
// 			var songView = new SongView({ model: song });
// 			self.$el.append(songView.render().$el);
// 		});
// 	}
// });

// var songs = new Songs();
// songs.add(new Song({ title: "Blue in Green" }));
// songs.add(new Song({ title: "So what" }));

// var songsView = new SongsView({ el: "#songs", model: songs });
// songsView.render();





/**
 * Handling DOM events
**/

// var Song = Backbone.Model.extend();

// var SongView = Backbone.View.extend({
// 	events: {
// 		"click .bookmark": "onBookmark",
// 		"click": "onClick"
// 	},

// 	onBookmark: function(e) {
// 		e.stopPropagation();
// 		console.log("Bookmark clicked");
// 	},

// 	onClick: function() {
// 		console.log("Listen clicked");
// 	},

// 	render: function() {
// 		this.$el.html(this.model.get("title") + " <button>Listen</button> <button class='bookmark'>Bookmark</button>");
// 		return this;
// 	}
// });

// var song = new Song({ title: "Blue in Green" });

// var songView = new SongView({ el: "#container", model: song });
// songView.render();





/**
 * Handling model events
**/

// var Song = Backbone.Model.extend({
// 	defaults: {
// 		listeners: 0
// 	}
// });

// var SongView = Backbone.View.extend({
// 	initialize: function() {
// 		// this.listenTo(this.model, "change", this.render);
// 		//or
// 		this.model.on("change", this.render, this);
// 	},

// 	render: function() {
// 		this.$el.html(this.model.get("title") + " - Listeners: " + this.model.get("listeners"));
// 		return this;
// 	}
// });

// var song = new Song({ title: "Blue in Green" });

// var songView = new SongView({ el: "#container", model: song });
// songView.render();





/**
 * Handling collection events
**/

// var Song = Backbone.Model.extend();

// var Songs = Backbone.Collection.extend({
// 	model: Song
// })

// var SongView = Backbone.View.extend({
// 	tagName: "li",

// 	render: function() {
// 		this.$el.html(this.model.get("title"));
// 		return this;
// 	}
// });

// var SongsView = Backbone.View.extend({
// 	tagName: "ul",

// 	initialize: function() {
// 		// this.listenTo(this.model, "add", this.render);
// 		//or
// 		this.model.on("add", this.render, this);
// 		this.model.on("remove", this.render, this);
// 	},

// 	render: function() {
// 		var self = this;
// 		this.$el.html('');
// 		this.model.each(function(song) {
// 			var songView = new SongView({ model: song });
// 			self.$el.append(songView.render().$el);
// 		});
// 	}
// });

// var songs = new Songs();
// songs.add(new Song({ title: "Blue in Green" }));
// songs.add(new Song({ title: "So what" }));

// var songsView = new SongsView({ el: "#songs", model: songs });
// songsView.render();





/**
 * Templating
**/

// var Song = Backbone.Model.extend({
// 	defaults: {
// 		plays: 1000
// 	}
// });

// var SongView = Backbone.View.extend({
// 	render: function() {
// 		var template = _.template($("#songTemplate").html());
// 		var html = template(this.model.toJSON());
// 		this.$el.html(html);
// 		return this;
// 	}
// });

// var song = new Song({ title: "Blue in Green" });

// var songView = new SongView({ el: "#container", model: song });
// songView.render();





/**
 * Demo
**/

var Vehicle = Backbone.Model.extend({
	//urlRoot: "/api/vehicles"
	deafults: {
		registrationNumber: null
	},
	validate: function(attrs) {
		if(attrs.registrationNumber == null || attrs.registrationNumber == undefined) {
			return "ERROR. registrationNumber is required";
		}
	},
	start: function() {
		console.log("Vehicle started.");
	}
});

var Car = Vehicle.extend({
	start: function() {
		console.log("Car started started with " + this.get('registrationNumber') + ".");
	}
});

var Vehicles = Backbone.Collection.extend({
	model: Car
});

var VehicleView = Backbone.View.extend({
	tagName: "li",

	events: {
		'click': 'onClick'
	},

	onClick: function() {
		this.model.destroy();
	},

	render: function() {
		var template = _.template($("#vehicleTemplate").html());
		var html = template(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});

var VehiclesView = Backbone.View.extend({
	tagName: "ul",

	initialize: function() {
		this.listenTo(this.model, "remove", this.render);
	},

	render: function() {
		var self = this;
		this.$el.html('');
		this.model.each(function(vehicle) {
			var vehicleView = new VehicleView({ model: vehicle });
			self.$el.append(vehicleView.render().$el);
		});
	}
});

var vehicles = new Vehicles();

vehicles.add(new Car({ registrationNumber: "XLI887", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "ZNP123", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "XUV456", colour: "White"}));

var vehiclesView = new VehiclesView({ el: "#vehicles", model: vehicles});
vehiclesView.render();

	