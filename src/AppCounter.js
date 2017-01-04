import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            clicks: 0
        }
    }
    update(e){
        store.dispatch({type: 'INCREMENT'});
        this.setState({clicks: store.getState()});
    }
    render(){
        return(
            <div>
                <button onClick={this.update.bind(this)}>
                    Increment
                </button>
                {this.state.clicks}
            </div>
        )
    }
}

const counter = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT': 
            return state + 1;
        case 'DECREMENT':
            return state -1;
        default:
            return state;
    }
}

const store = createStore(counter);
// store.subscribe(()=> {
// });

// const render = () => {
//     ReactDOM.render(
//         <Counter value={store.getState()} />,
//         document.getElementById('root')
//     );
// };

console.log(store.getState());

export default App