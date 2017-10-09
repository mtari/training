// clear the screen for testing
// document.body.innerHTML = '';
// document.body.style.background="white";

var cats = [
	{
		"name": "Cat 1",
		"img": "http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
		"clicks": 0
	},
	{
		"name": "Cat 2",
		"img": "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
		"clicks": 0
	},
	{
		"name": "Cat 3",
		"img": "https://www.pets4homes.co.uk/images/articles/771/large/cat-lifespan-the-life-expectancy-of-cats-568e40723c336.jpg",
		"clicks": 0
	},
	{
		"name": "Cat 4",
		"img": "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
		"clicks": 0
	},
	{
		"name": "Cat 5",
		"img": "https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg",
		"clicks": 0
	}
]

// Let's loop over the numbers in our array
for (var i = 0; i < cats.length; i++) {

    // This is the number we're on...
    var cat = cats[i];

    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = cat.name;

    // ... and when we click, alert the value of `num`
    elem.addEventListener('click', (function(index) {
        return function() {

        	var locCat = cats[index];

        	$("#catNameContainer").text(locCat.name);
        	
        	$("#catImageContainer").empty();
        	$("#catImageContainer").unbind("click");
        	
        	var imageHTML = `<img id="theImg" src="${locCat.img}" />`;
        	$("#catImageContainer").append(imageHTML);
        	$("#catImageContainer").click(function(){
				locCat.clicks++;
				$("#catClicksContainer").text(locCat.clicks);
        	});

        	$("#catClicksContainer").text(locCat.clicks);

            // alert(catCopy);
        };
    })(i));

    // finally, let's add this element to the document
    document.body.appendChild(elem);
};