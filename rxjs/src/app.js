import $ from 'jquery';
import Rx from 'rxjs/Rx';

//Observables from events >>>>>
/*
const btn = $('#btn');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');
btnStream$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);

const input = $('#input');
const output = $('#output');
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
inputStream$.subscribe(
	(x) => {
		console.log(x.target.value);
		output.append(x.target.value);
	},
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Observables from events



//Observables from arrays >>>>>
/*
const numbers = [33, 44, 55, 66, 77];
const numbers$ = Rx.Observable.from(numbers);
numbers$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);

const postsOutput = $('#posts');
const posts = [
	{title: "Title 1", body: "Body 1"},
	{title: "Title 2", body: "Body 2"},
	{title: "Title 3", body: "Body 3"},
];
const posts$ = Rx.Observable.from(posts);
posts$.subscribe(
	(x) => {
		console.log(x);
		postsOutput.append('<li>' + x.title + '</li>');
	},
	(e) => console.log(e),
	() => console.log('complete')
);

const map = new Map([[1, 2], [3, 4], [5, 6]]);
const map$ = Rx.Observable.from(map);
map$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Observables from arrays



//Observables from scratch >>>>>
/*
const source$ = new Rx.Observable(observer => {
	console.log('creating observable');
	observer.next('Hello world');
	observer.next('Another value');

	observer.error(new Error("Something went wrong!"));

	setTimeout(() => {
		observer.next("Yet another value");
		observer.complete();
	}, 3000);
});
source$
.catch(err => Rx.Observable.of(err))
.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Observables from scratch



//Observables from promise >>>>>
/*
const promise = new Promise((resolve, reject) => {
	console.log("creating promise");
	setTimeout(() => {
		resolve("hello from promise");
	}, 3000);
});
const promise$ = Rx.Observable.fromPromise(promise);
promise$
.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Observables from promise



//Interval >>>>>
/*
const source$ = Rx.Observable.interval(1000).take(5);
source$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Interval



//Timer >>>>>
/*
const source$ = Rx.Observable.timer(4000, 1000).take(5);
source$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Timer



//Range >>>>>
/*
const source$ = Rx.Observable.range(0, 5);
source$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Range



//Map >>>>>
/*
const source$ = Rx.Observable.interval(1000)
	.take(10)
	.map(v => v * 2);

source$
.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);

const source$ = Rx.Observable.from(["John", "Tom", "Sam"])
	.map(v => v.toUpperCase())
	.map(v => "I am " + v);

source$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< Map



//pluck >>>>>
/*
const posts = [
	{title: "Title 1", body: "Body 1"},
	{title: "Title 2", body: "Body 2"},
	{title: "Title 3", body: "Body 3"},
];
const posts$ = Rx.Observable.from(posts)
	.pluck('title');
posts$.subscribe(
	(x) => {
		console.log(x);
	},
	(e) => console.log(e),
	() => console.log('complete')
);
*/
//<<<<< pluck



//Merge >>>>>
/*
Rx.Observable.of("Hello")
	.merge(Rx.Observable.of("Everyone"))
	.subscribe(
		(x) => {
			console.log(x);
		},
		(e) => console.log(e),
		() => console.log('complete')
	);

Rx.Observable.interval(2000)
	.merge(Rx.Observable.interval(500))
	.take(25)
	.subscribe(
		(x) => {
			console.log(x);
		},
		(e) => console.log(e),
		() => console.log('complete')
	);

const source1$ = Rx.Observable.interval(2000).map(v => "Merge 1: " + v);
const source2$ = Rx.Observable.interval(500).map(v => "Merge 2: " + v);
Rx.Observable.merge(source1$, source2$)
	.take(25)
	.subscribe(
		(x) => {
			console.log(x);
		},
		(e) => console.log(e),
		() => console.log('complete')
	);
*/
//<<<<< Merge



//Concat >>>>>
/*
const source1$ = Rx.Observable.range(0, 5).map(v => "Concat 1: " + v);
const source2$ = Rx.Observable.range(6, 5).map(v => "Concat 2: " + v);
Rx.Observable.concat(source1$, source2$)
	.subscribe(
		(x) => {
			console.log(x);
		},
		(e) => console.log(e),
		() => console.log('complete')
	);
*/
//<<<<< Concat



//MergeMap >>>>>
/*
Rx.Observable.of("Hello")
	.subscribe(
		v => {
			Rx.Observable.of(v + " everyone")
			.subscribe(
				(x) => console.log(x), 
				(e) => console.log(e),
				() => console.log('complete 1')
			);
		},
		(e) => console.log(e),
		() => console.log('complete 2')
	)
*/
// USE THIS INSTEAD
Rx.Observable.of('Hello')
	.mergeMap(
		v => {
			return Rx.Observable.of(v + ' 1');
		}
	)
	.mergeMap(
		v => {
			return Rx.Observable.of(v + ' 2');
		}
	)
	.subscribe(
		(x) => console.log(x), 
		(e) => console.log(e),
		() => console.log('complete')
	);
//<<<<< MergeMap



//SwitchMap >>>>>
/*
function getUser(userName) {
	return $.ajax({
		url: "https://api.github.com/users/" + userName, 
		dataType: 'jsonp'
	}).promise();
};
const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup');
inputSource$.subscribe(e => {
	Rx.Observable.fromPromise(getUser(e.target.value))
		.subscribe(
			x => {
				console.log(x.data);
			}
		);
});
*/
// USE THIS INSTEAD
function getUser(userName) {
	return $.ajax({
		url: "https://api.github.com/users/" + userName, 
		dataType: 'jsonp'
	}).promise();
};
const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup')
	.map(e => e.target.value)
	.switchMap(v => {
		return Rx.Observable.fromPromise(getUser(v));
	})
	.subscribe(
		(x) => console.log(x), 
		(e) => console.log(e),
		() => console.log('complete')
	);
//<<<<< SwitchMap