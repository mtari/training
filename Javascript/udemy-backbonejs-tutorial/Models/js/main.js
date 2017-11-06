var Song = Backbone.Model.extend({
	defaults: {
		genre: "jazz"
	},
	initialize: function() {
		console.log("Song initialized");
	},
	validate: function(attrs) {
		if(!attrs.title) {
			return "Title is required";
		}
	}
});

//================== Working with attributes ==================
var song = new Song({
	title: "Blue in Green",
	artist: "Miles DaviD",
	publishYear: 1959
});
song.set('title', "Blue in green");
song.set({
	artist: "Miles Davis",
	publishYear: 1959
});

console.log(song.get('title'));

//Removes title attribute
//song.unset('title');

//Removes all attributes
// song.clear();

//================== Validate model ==================
//This is calling the validate method
console.log(song.isValid());

//================== Inheritance ==================
var Animal = Backbone.Model.extend({
	walk: function() {
		console.log("Animal walking...");
	}
});

var Dog = Animal.extend({
	//Overriding method
	walk: function() {
		//calling super :)
		Animal.prototype.walk.apply(this);

		console.log("Dog walking...");
	}
});

var dog = new Dog();
dog.walk();

//================== Connecting to server ==================
//var Song = Backbone.Model.extend({
	//urlRoot: "/api/songs"
	//idAttribute: "songId"
//}
//
//song.fetch();
//song.save();
//song.destroy();
//
//song.fetch({
	//success: function() {...},
	//error: function() {...}
//})
// 
//song.destroy({
	//success: function() {...},
	//error: function() {...}
//})
// 
//song.save({}, {
	//success: function() {...},
	//error: function() {...}
//})

//================== Demo ==================
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

var car = new Car({registrationNumber: "XLI887", color: "Blue"});
console.log("car " + JSON.stringify(car));
car.unset('registrationNumber');
console.log(car.isValid());
car.set("registrationNumber", "XLI887");
console.log(car.isValid());
car.start();