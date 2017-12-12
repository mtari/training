// JSX - Javascript XML
// var user = {
//     name: "Mihaly",
//     age: 33,
//     location: "London"
// }

// //Returning Unknown when the location is not set
// function getLocation1(location) {
//     return (location != null) ? location : "Unknown";
// }
// var template1 = (
//     <div>
//         <h1>{user.name}</h1>
//         <p>Age: {user.age}</p>
//         <p>Location: {getLocation1(user.location)}</p>
//     </div>
// );

// //Only render the p node if location is set
// function getLocation2(location) {
//     if(location != null) {
//         return <p>Location: location</p>
//     }
// }
// var template2 = (
//     <div>
//         <h1>{user.name}</h1>
//         <p>Age: {user.age}</p>
//         { getLocation2(user.location) }
//     </div>
// );

// var template3 = (
//     <div>
//         <h1>{user.name}</h1>
//         <p>Age: {user.age}</p>
//         <p>Location: {(user.location != null) ? user.location : "Unknown"}</p>
//     </div>
// );

// var template4 = (
//     <div>
//         <h1>{user.name}</h1>
//         <p>Age: {user.age}</p>
//         {
//             user.location != null &&
//             <p>Location: {user.location}</p>
//         }
        
//     </div>
// );



//Events and interactions
// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// };
// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };
// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };

// var appRoot = document.getElementById('app');

// const renderCounterApp = () => {
//     var template5 = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );

//     ReactDOM.render(template5, appRoot);
// }

// renderCounterApp();



//Forms & Arrays
const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();
    
    const option = e.target.elements.option.value;

    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
};

const onRemoveAll = () => {
    app.options = [];
    render();
}

const onMakeDecision = () => {
    const random = Math.floor(Math.random() * app.options.length);
    console.log(app.options[random]);
}

var appRoot = document.getElementById('app');

var render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button disabled={(app.options.length > 0) ? false : true} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove all</button>
            <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"></input>
                <button>Add Option</button>
            </form>
        </div>
    );
    
    ReactDOM.render(template, appRoot);
};

render();