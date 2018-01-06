import { createStore } from 'redux';

//Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
});

//Reducers
//1. Reducers are pure functions, meaning the output is only determind by the input
//2. Never change state or action
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };

        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };

        case 'RESET':
            return {
                count: 0
            };

        case 'SET':
            return {
                count: action.count
            };

        default:
            return state;
    }
}

const store = createStore(countReducer);

//Subscribint to store changes
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//Actions - an object that gets sent to the store

//I'd like to increment the count
store.dispatch(incrementCount({ incrementBy: 5}));

//calling this method will stop the subscription
//unsubscribe();

store.dispatch(incrementCount());

//I'd like to reset the count
store.dispatch(resetCount());

//I'd like to decrement the count
store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 2 }));

store.dispatch(setCount({ count: 100 }));