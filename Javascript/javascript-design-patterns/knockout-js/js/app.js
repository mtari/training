var initialCats = [
	{
		catClickCount: 0,
		catName: 'Tabby 1',
		catImgSrc: 'img/22252709_010df3379e_z.jpg',
		catImgAttribution: 'img/22252709_010df3379e_z.jpg',
		catNickNames: [
	    	{catNickName: "Nick Name 1.1"},
	    	{catNickName: "Nick Name 1.2"},
	    	{catNickName: "Nick Name 1.3"}
	    ]
	},
	{
		catClickCount: 0,
		catName: 'Tabby 2',
		catImgSrc: 'img/22252709_010df3379e_z.jpg',
		catImgAttribution: 'img/22252709_010df3379e_z.jpg',
		catNickNames: [
	    	{catNickName: "Nick Name 2.1"},
	    	{catNickName: "Nick Name 2.2"},
	    	{catNickName: "Nick Name 2.3"}
	    ]
	},
	{
		catClickCount: 0,
		catName: 'Tabby 3',
		catImgSrc: 'img/22252709_010df3379e_z.jpg',
		catImgAttribution: 'img/22252709_010df3379e_z.jpg',
		catNickNames: [
	    	{catNickName: "Nick Name 3.1"},
	    	{catNickName: "Nick Name 3.2"},
	    	{catNickName: "Nick Name 3.3"}
	    ]
	}
]

var Cat = function(data) {
	this.catClickCount = ko.observable(data.catClickCount);
	this.catName = ko.observable(data.catName);
	this.catImgSrc = ko.observable(data.catImgSrc);
	this.catImgAttribution = ko.observable(data.catImgAttribution);
	this.catNickNames = ko.observableArray(data.catNickNames);

	this.catLevel = ko.computed(function() {
		if(this.catClickCount() > 20) {
			return "Teen";
		}
		else if(this.catClickCount() > 10) {
			return "Baby";
		}

        return "Infant";
    }, this);
}

var ViewModel = function() {
	var self = this;

	this.catList = ko.observableArray([]);

	initialCats.forEach(function(catItem) {
		self.catList.push(new Cat(catItem));
	});

	this.currentCat = ko.observable( this.catList()[0] );

	this.incrementCounter = function() {
		self.currentCat().catClickCount(self.currentCat().catClickCount() + 1);
	};

	this.setCurrentCat = function() {
		var context = ko.contextFor(event.target);
		self.currentCat( self.catList()[context.$index()] );
	};
}


ko.applyBindings(ViewModel);