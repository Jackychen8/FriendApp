import React from 'react';

//returns a extends React.Component :O 
const HOC = (InnerComponent) => class extends React.Component {
    constructor(){
        super();
        this.state={count: 0}
    }
    update(){this.setState({count: this.state.count + 1})}
    componentWillMount() {
        console.log('Will Mount')//just for fun
    }
    render(){//pass through props
        return (
            <InnerComponent
                {...this.props}
                {...this.state}
                update={this.update.bind(this)}
            />
        )
    }
}

class App extends React.Component {
    render(){
        return(
            <div>
                <Button>Button</Button>
                <hr/>
                <LabelHOC>Mouse Over Here</LabelHOC>
            </div>
        )
    }
}

class Label extends React.Component {
    render(){
        return (
            <label onMouseMove={this.props.update}>{this.props.children} : {this.props.count}</label>
        )
    }
}

const LabelHOC = HOC(Label)

const Button = HOC((props) => <button onClick={props.update}>{props.children} : {props.count}</button>)

export default App