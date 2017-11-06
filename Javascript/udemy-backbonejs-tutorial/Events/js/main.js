/**
 * Binding and Trigger Custom Events
**/

// var person = {
// 	name: "Mosh",

// 	walk: function() {
// 		this.trigger("walking", {
// 			speed: 1, 
// 			startTime: "08:00"
// 		});
// 	}
// };

// _.extend(person, Backbone.Events);

// //subscribe to event
// person.on("walking", function(e) {
// 	console.log("Person is walking " + e);
// });

// //unsubsribe from event
// person.off("walking");

// //subscribe to event only once
// person.once("walking", function(e) {
// 	console.log("Person is walking only ONCE " + e);
// });

// person.walk();
// person.walk();





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

	initialize: function(options) {
		this.bus = options.bus;
		this.listenTo(this.model, "add", this.render);
		this.listenTo(this.model, "remove", this.render);
		this.listenTo(this.bus, "addCar", this.onAddCar);
	},

	onAddCar: function(registrationNumber) {
		this.model.add(new Car({registrationNumber: registrationNumber}));
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

var NewVehicleView = Backbone.View.extend({
	tagName: "div",

	initialize: function(options) {
		this.bus = options.bus;
		this.$input = this.$("#new-vehicle-input");
	},

	events: {
		'click #addButton': 'onClick'
	},

	onClick: function() {
		this.bus.trigger('addCar', this.$input.val())
	},

	render: function() {
		return this;
	}
});

var vehicles = new Vehicles();

vehicles.add(new Car({ registrationNumber: "XLI887", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "ZNP123", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "XUV456", colour: "White"}));

var bus = _.extend({}, Backbone.Events);

var vehiclesView = new VehiclesView({ el: "#vehicles", model: vehicles, bus: bus });
vehiclesView.render();

var newVehicleView = new NewVehicleView({ el: "#new-vehicle", bus: bus });
newVehicleView.render();
