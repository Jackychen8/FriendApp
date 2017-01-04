import React from 'react';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

let todoId = 0;

// Helper Functions
const getVisibleTodos = (filter, todos) => {
    return todos.filter(todo => {
        if (todo.filter === filter){
            return todo
        }
    });
};

// Action Creators
const addTodo = (text) => {
    return ({
        text: text,
        id: todoId++,
        type: 'ADD_TODO'
    });
};

const toggleTodo = ({dispatch, id}) => {
    return({
        type: 'TOGGLE_TODO',
        id
    });
};

// Presentational Components
let AddTodoBox = ({dispatch}) => {
    let input;
    return(
        <div>
            <input 
                type="text" 
                ref={node => input = node}
            />
            <button onClick={ (input) => {
                dispatch(addTodo(input.value))
            }}/>
        </div>
    );
};
AddTodoBox = connect()(addTodo);// No state values to map

const Todo = (text) => {
    return(
        <li onClick={() => {
            
        }}>
            {text}
        </li>
    );
};

const TodoList = ({store}) => {
    let state = store.getState();
    return(
        <ul>
        {
            getVisibleTodos(state.visibilityFilter, state.todo).map( (task)=>{
                    return (
                        <Todo text={task.text}/>
                    );
                })
        }
        </ul>
    );
};

let FilterLink = ({dispatch}) => {
    return(
        <a href="#" onClick={e => {
            e.preventDefault();
            dispatch({
                type: 'SHOW_ALL',
            });
        }}>{this.props.children}
        </a>
    );
};
// FilterLink = connect()(FilterLink);

const VisiblityFilter = () => {
    return(
        <div>
            <FilterLink>
                All
            </FilterLink>
            <FilterLink>
                Active
            </FilterLink>
            <FilterLink>
                Completed
            </FilterLink>
        </div>
    );
};

const TodoApp = () => {
    return(
        <div>
            <AddTodoBox />
            <TodoList />
            <VisiblityFilter />
        </div>
    );
};

//////////////////// Reducers ////////////////////
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type){
        case 'SHOW_ALL':
            return [...state, {filter: 'SHOW_ALL'}];
        case 'SHOW_ACTIVE':
            return [...state, {filter: 'SHOW_ACTIVE'}];
        case 'SHOW_COMPLETED':
            return [...state, {filter: 'SHOW_COMPLETED'}];
        default:
            return state;
    }
};

const todo = (state = {}, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {
                text: action.text,
                id: action.id,
                completed: false
            }];
        case 'TOGGLE_TODO':
            return state.map(task => {
                if(task.id === action.id){
                    return ({
                        id: task.id,
                        text: task.text,
                        completed: !task.completed
                    });
                }
                return task;
            });
        default:
            return state; 
    }
};

const todoApp = combineReducers({todo, visibilityFilter});

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);