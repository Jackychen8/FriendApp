import React from 'react'
import ReactDOM from 'react-dom'//need for mounting

class App extends React.Component {
    constructor(){
        super(); //allows this to be this instance rather than parent component
        this.state = {
            val:0,
            items: []
        };
        this.update = this.update.bind(this);
        //since here, don't have to do this in dom for elements of component
    }
    update(){
        this.setState({val: this.state.val+1})
    }
    filter(e){
        this.setState({filter: e.target.value});
    }
    componentWillMount() {
        console.log('componentWillMount');
        // this.setState({m:2})
        fetch( 'http://swapi.co/api/people/?format=json' )
            .then( res => res.json() )
            .then( ({results: items}) => this.setState({items}) )
    }
    componentDidMount() {
        console.log('componentDidMount')
    }
    render(){
        let items = this.state.items;
        console.log('render')
        if(this.state.filter){
            items = items.filter( item =>
                item.name.toLowerCase()
                .includes(this.state.filter.toLowerCase()))
        }
        return( 
        <div>
            <input type="text"
            onChange={this.filter.bind(this)}/>
            {items.map(item => 
                <Person key={item.name} person={item} />)}
            <button onClick={this.update}>{this.state.val * this.state.m}</button>
        </div>
        )
    }
}

const Person = (props) => <h4>{props.person.name}</h4>

class Wrapper extends React.Component {
    mount = () => {
        ReactDOM.render(<App/>, document.getElementById('a'))
    }
    unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }
    render(){
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>UnMount</button>
                <div id="a"></div>
            </div>
            )
    }
}

export default Wrapper