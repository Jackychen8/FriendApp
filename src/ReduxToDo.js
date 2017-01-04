//ReduxToDo
// import React from 'react';
// import Redux from 'redux';
//import { createStore } from 'redux';
import { combineReducers } from 'redux';

//Practicejsbin
const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO': 
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        };
      });
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) =>{
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


// const todoApp = (state={}, action)=> {
//   return {
//     todos: todos(
//       state.todo,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// };

// Or Function above can be written like
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp //, TodoApp



// let todoID = 0;
// //const store = createStore(todoApp);

// class TodoApp extends React.Component {
//   render(){
//     return(
//       <div>
//         <input type="text" ref={node=> {this.input = node;}}/>
//         <button onClick={()=>{
//           store.dispatch({
//             text: this.input.value,
//             type: 'ADD_TODO',
//             id: todoID++ 
//           });
//           this.input.value='';
//         }}>
//           Add Todo
//         </button>
//         <ul>
//           {this.props.todos.map(task =>
//             <li key={task.id}>
//               {task.text}
//             </li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }

//implement combineReducers from scratch to understand it better
// const combineReducers = (reducers) => {//takes in the reducers
//   return (state = {}, action) => {//returns a single reducer
    
    //example of Object.keys
    // array like object with random key ordering
    //var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
    //console.log(Object.keys(an_obj)); // console: ['2', '7', '100']

    //example of reduce
    // var sum = [0, 1, 2, 3].reduce(function(a, b) {
    //   return a + b;
    // }, 0);
    // a is what is carried on, starts as 0
    // sum is 6

    // retrieve all keys of reducers that were passed in
    // array of strings "todo" and "visibilityFilter"
//     return Object.keys(reducers).reduce(//reduce operation fills it gradually
//       // next state is mutated on every iteration
//       // reducer is still pure though because it is an internal object
//       (nextState, key) => {
//         nextState[key] = reducers[key](state[key], action);
//         return nextState;
//       },
//       {}//nextState starts as an empty object, the new reducer
//     );
//   };
// };

//const testAddToDo = () => {
//   const before = [];
//   const AddToDo = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
//   };
//   const after = [{
//     id: 0,
//     text: 'Learn Redux',
//     completed: false
//   }];
  
//   //deepFreeze(before);
//   //deepFreeze(AddToDo);

//   expect(
//     todos(before, AddToDo)
//   ).toEqual(after);
// };

// const testToggleToDo = () => {
//   const before=[
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: false
//     }
//   ];
//   const action = {
//      id: 1,
//      type: 'TOGGLE_TODO'
//    }
//   const after = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: true
//     }
//   ];
  
//   deepFreeze(before);
//   deepFreeze(action);
//   expect(
//     todos(before, action)
//   ).toEqual(after);
// };

// testAddToDo();
// console.log("1st Test Passed.");
// testToggleToDo();
// console.log("All Tests Passed.");