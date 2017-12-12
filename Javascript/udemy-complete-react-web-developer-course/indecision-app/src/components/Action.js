import React from 'react';

// class Action extends React.Component {
//     constructor(props) {
//         super(props);

//         this.handlePick = this.handlePick.bind(this);
//     }

//     handlePick() {
//         this.props.handlePick();
//     }

//     render() {
//         return (
//             <button onClick={this.handlePick}>What should I do?</button>
//         );
//     }
// }

//Stateless functional components
const Action = (props) => {
    return (
        <button
            className='big-button'
            onClick={props.handlePick}
            disabled={!props.hasOption}
        >
            What should I do?
        </button>
    );
}

export default Action;