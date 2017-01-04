import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const App = () => {
//   return (
//     <h1>Hello World2</h1>
//   );
// }

class App extends Component {
  constructor(){
    super();//gives "this"
    this.state = {
      txt: 'this is state txt',
      currentEvent: '___',
      a: ''
    }
    this.boxUpdate = this.boxUpdate.bind(this) 
  }
  boxUpdate(e){
    this.setState({currentEvent: e.type})
  }
  update(){
    //this.setState({txt: e.target.value})
    this.setState({a: this.a.value})
  }
  render() {
    return (
      <div>
        <input 
          ref={node => this.a = node}
          onChange={this.update.bind(this)}
        /> {this.state.a}
        <hr/>
        <Title text="Hello World" />
        <Button>I <Heart /> React</Button>
        <Textbox update={this.update.bind(this)} />
        <h1>{this.state.txt}</h1>
        <textarea
          onKeyPress={this.boxUpdate}
          onCopy={this.boxUpdate}
          onCut={this.boxUpdate}
          onFocus={this.boxUpdate}
          onBlur={this.boxUpdate}
          onPaste={this.boxUpdate}
          onDoubleClick={this.boxUpdate}
          onTouchStart={this.boxUpdate}
          onTouchMove={this.boxUpdate}
          onTouchEnd={this.boxUpdate}
          cols="30"
          rows="10" />
        <h1>{this.state.currentEvent}</h1>
      </div>
    );
  }
}//touchStart is for iPad/iPhone

// Why doesn't this work?
// App.propTypes = {
//   this.state.txt: React.PropTypes.string,
// }

// App.defaultProps = {
//   this.state.txt: "default text"
// }

const Title = (props) => <h1>Title: {props.text}</h1>

Title.propTypes = {//custom prop type specifications
  text(props, propName, component){
    // props is an object
    // propName is 'text'
    // component is 'Title'
    console.log('props: ' + props + ', propName: ' + propName + ', component: ' + component)
    if(!(propName in props)){
      return new Error('missing ${propName}')
    }
    if(props[propName].length < 6){
      return new Error('${propName} is too short')
    }
    }
}



const Button = (props) => <button>{props.children}</button>

const Textbox = (props) =>
  <input type="text" onChange={props.update} />

class Heart extends React.Component {
  render(){
    return <span>&hearts;</span>
  }
}

export default App;
