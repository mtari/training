import $ from 'jquery';
import Rx from 'rxjs/Rx';

const btn = $('#btn');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');
btnStream$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);

const input = $('#input');
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
inputStream$.subscribe(
	(x) => console.log(x),
	(e) => console.log(e),
	() => console.log('complete')
);