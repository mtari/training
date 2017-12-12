class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        this.addOption = this.addOption.bind(this);
        this.removeAllOptions = this.removeAllOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options: props.options
        }
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

    addOption(option) {
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    removeAllOptions() {
        this.setState( () => ( {options: []} ) );
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick() {
        var index = Math.floor(this.state.options.length * Math.random());
        console.log(this.state.options[index]);
    }

    render() {
        return (
            <div>
                <Header />
                <Action handlePick={this.handlePick} />
                <Options options={this.state.options} removeAllOptions={this.removeAllOptions} handleDeleteOption={this.handleDeleteOption} />
                <AddOption addOption={this.addOption} />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}

// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         )
//     }
// }

//Stateless functional components
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {
                props.subtitle &&
                <h2>{props.subtitle}</h2>
            }
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision App'
}

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
        <button onClick={props.handlePick}>What should I do?</button>
    );
}

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
            <button onClick={props.removeAllOptions}>Remove All</button>
            {
                props.options.map((option) => <Option key={option} option={option} handleDeleteOption={props.handleDeleteOption} />)
            }
        </div>
    );
}

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
        <div>
            <span>{props.option}</span>
            <button onClick={(e) => {
                props.handleDeleteOption(props.option);
            }}>Remove</button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        this.props.addOption(option);

        e.target.elements.option.value = '';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="option"></input>
                    <button>Add option</button>
                </form>
                
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));