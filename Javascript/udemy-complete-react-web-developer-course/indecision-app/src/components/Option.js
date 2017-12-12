import React from 'react';

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 <p>{this.props.option}</p>
//             </div>
//         );
//     }
// }

//Stateless functional components
const Option = (props) => {
    return (
        <div className='option'>
            <p className='option__text'>{props.count}. {props.option}</p>
            <button
                className='button button--link'
                onClick={(e) => {
                    props.handleDeleteOption(props.option);
                }}
            >Remove</button>
        </div>
    );
}

export default Option;