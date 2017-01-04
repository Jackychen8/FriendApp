import React from 'react';

class App extends React.Component {
    render(){
        return (
            <Buttons>
                <button value="a">a</button>
                <button value="b">b</button>
                <button value="c">c</button>
            </Buttons>
        )
    }
}

class Buttons extends React.Component {
    constructor(){
        super();
        this.state={selected: 'None'}
    }
    selectItem(selected){
        this.setState({selected})
    }
    render(){
        let fn = (child) => React.cloneElement(child, {
            onClick: this.selectItem.bind(this, child.props.value)//this is the magic of passing child prop value
        }) 
        let items = React.Children.map(this.props.children, fn);
        return (
            <div>
                <h2>You have selected: {this.state.selected}</h2>
                {items}
            </div>
        )
    }
}

export default App