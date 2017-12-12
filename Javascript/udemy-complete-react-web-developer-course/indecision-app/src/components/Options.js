import React from 'react';
import Option from './Option.js';

// class Options extends React.Component {
//     constructor(props) {
//         super(props);

//         this.handleRemoveAll = this.handleRemoveAll.bind(this);
//     }

//     handleRemoveAll() {
//         this.props.removeAllOptions();
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.handleRemoveAll}>Remove All</button>
//                 {
//                     this.props.options.map((option) => <Option key={option} option={option} />)
//                 }
//             </div>
//         );
//     }
// }

//Stateless functional components
const Options = (props) => {
    return (
        <div>
            <div className='widget-header'>
                <h3 className='widget-header__title'>Your options</h3>
                <button
                    className='button button--link'
                    onClick={props.removeAllOptions}
                >
                    Remove All
                </button>
            </div>
            
            {
                props.options.length === 0 && 
                <p className='widget__message'>Please add an option to get started!</p>
            }
            {
                props.options.map((option, index) => <Option key={option} option={option} count={index + 1} handleDeleteOption={props.handleDeleteOption} />)
            }
        </div>
    );
}

export default Options;