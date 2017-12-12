import React from 'react';

import AddOption from './AddOption.js';
import Options from './Options.js';
import Action from './Action.js';
import Header from './Header.js';
import OptionModal from './OptionModal.js';

export default class IndecisionApp extends React.Component {
    state = {
        options: this.props.options,
        selectedOption: undefined
    }

    addOption = (option) => {
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    removeAllOptions = () => {
        this.setState( () => ( {options: []} ) );
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick = () => {
        const index = Math.floor(this.state.options.length * Math.random());
        const option = this.state.options[index];
        console.log(option);
        this.setState( () => ( {selectedOption: option } ) );
    }

    handleOkay = () => {
        this.setState( () => ( {selectedOption: undefined } ) );
    }

    // Component lifecycle
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({options}));
            }
        }
        catch(e) {
            //Do nothing at all!
        }
    }

    // Component lifecycle
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            console.log("saving data");
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }

    // Component lifecycle
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <div>
                <Header subtitle="Put your life in the hand of your computer" />
                <div className='container'>
                    <Action
                        handlePick={this.handlePick}
                        hasOption={this.state.options.length > 0}
                    />
                    <div className='widget'>
                        <Options options={this.state.options} removeAllOptions={this.removeAllOptions} handleDeleteOption={this.handleDeleteOption} />
                        <AddOption addOption={this.addOption} />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleOkay={this.handleOkay}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}