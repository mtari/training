var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
	model: Song
});

var songs = new Songs([
	new Song({title: "Song 1"}),
	new Song({title: "Song 2"}),
	new Song({title: "Song 3"})
]);

songs.add(new Song({title: "Song 4"}));

console.log(songs.at(0));
//get works with cid
console.log(songs.get("c1"));

//remove item from collection
// songs.remove(songs.at(0));
// songs.remove(songs.get("c1"));

//Adding at index
songs.add(new Song({title: "Song 4"}), { at:0 });

songs.push(new Song({title: "Song 4"}));

var lastSong = songs.pop();

//Finding and filtering
var jazzSongs = songs.where({ genre: "Jazz" });
console.log("Jazz songs", jazzSongs);

var firstJazzSong = songs.findWhere({ genre: "Jazz" });
console.log("First jazz song", firstJazzSong);

var filteredJazzSongs = songs.where({ genre: "Jazz", title: "Song 2" });
console.log("Filtered jazz songs", filteredJazzSongs);

//Filter the collection by some custom logic
var topDownloads = songs.filter(function(song) {
	return song.get("downloads") > 100;
});
console.log("Top downloads", topDownloads);

//Looping through collection
songs.each(function(song) {
	console.log(song);
});

/**
 * Connection to the serve
**/
//Fetching
// var Songs = Backbone.Collection.extend({
// 	model: Song,
// 	url: "/api/songs"
// });

// var songs = new Songs();

// songs.fetch(); //sends GET request to /api/songs

// //fetch with arguments
// songs.fetch({
// 	data: {
// 		page: 2
// 	},
// 	success: function() {},
// 	error: function() {}
// });

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

var vehicles = new Vehicles();

vehicles.add(new Car({ registrationNumber: "XLI887", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "ZNP123", colour: "Blue"}));
vehicles.add(new Car({ registrationNumber: "XUV456", colour: "White"}));

var blueCars = vehicles.where( {colour: "Blue"} );
console.log(blueCars);

var XLICar = vehicles.where( {registrationNumber: "XLI887"} );
console.log(XLICar);

vehicles.remove( XLICar );
console.log(vehicles);

vehicles.each(function(car) {
	console.log(car);
});