import React from 'react';

export default class AddOption extends React.Component {
    //This is only possible because of the plugin we use which is the 'transform-class-properties'
    handleSubmit = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        this.props.addOption(option);

        e.target.elements.option.value = '';
    }

    render() {
        return (
            <div>
                <form
                    className='add-option'
                    onSubmit={this.handleSubmit}
                >
                    <input className='add-option__input' type="text" name="option"></input>
                    <button className='button'>Add option</button>
                </form>
                
            </div>
        );
    }
}
