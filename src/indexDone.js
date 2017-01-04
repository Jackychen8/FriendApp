import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

// Globals
let todoId = 0;

// Helper Function
const getVisibleTodos = (todos, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    };
    /*
    return todos.filter(todo => {
        if(todo.completed ) {
            return todo;
        }
    });
    */
};

// Action Creators
const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

const addTodo = text => {
    return {
        type: 'ADD_TODO',
        text: text,
        id: todoId++
    };
};

const setFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
};

// Presentational Components
const Todo = ({
    onClick,
    completed,
    text
}) => {
    return(
        <li onClick={onClick}
            style={{
                textDecoration:
                completed ? 'line-through' : 'none'
            }}>
            {text}
        </li>
    );
};

const TodoList = ({
    todos,
    onClickTodo
}) => {
    return (
        <ul>
            { 
            todos.map(task => 
                <Todo
                    key={task.id}
                    {...task}
                    onClick={()=>onClickTodo(task.id)}
                />
            )}
        </ul>
    );
}
/*<Todo text={task.text}/>*/

const mapStateToTodoProps = (state) => {
    return {
        todos: getVisibleTodos(state.todo, state.visibilityFilter)
    };
};

const mapDispatchToTodoProps = (dispatch) => {
    return {
        onClickTodo: id => dispatch( toggleTodo(id) )
    };
};

const VisibleTodos = connect(
    mapStateToTodoProps,
    mapDispatchToTodoProps
)(TodoList);

let todoBox = ({dispatch}) => {
    let input;
    return(
        <div>
            <input type="text" ref={node => {input = node;}} />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};
const AddTodoBox = connect()(todoBox);

const Link = ({
    children,
    active,
    onClick
}) => {
    if(active){
        return <span>{children}</span>
    }
    return(
        <a href="#" onClick={onClick}>
        {children}
        </a> 
    );
};

// let FilterLink = (props) => {
//     return(
//         <a href="#" onClick={e => {
//             e.preventDefault();
//             console.log('Clicked: ' + props.filter);

//         }}>
//             {props.children}
//         </a>
//     );
// };
const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: state.visibilityFilter === ownProps.filter,
        children: ownProps.children
    }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: e => { 
            e.preventDefault();
            dispatch(setFilter(ownProps.filter)); 
        }
    }
};

const FilterLink = connect( 
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

const VisiblityFilter = () => {
    return(
        <div>
            <FilterLink filter='SHOW_ALL'>
                All
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_ACTIVE'>
                Active
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_COMPLETED'>
                Completed
            </FilterLink>
        </div>
    );
};

const TodoApp = () => {
    // <TodoList />
    return(
        <div>
            <AddTodoBox />
            <VisiblityFilter />
            <VisibleTodos />
        </div>
    );
};

// Reducers
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    // switch(action.type){
    //     case 'SHOW_ALL':
    //         return [...state, {filter: 'SHOW_ALL'}];
    //     case 'SHOW_ACTIVE':
    //         return [...state, {filter: 'SHOW_ACTIVE'}];
    //     case 'SHOW_COMPLETED':
    //         return [...state, {filter: 'SHOW_COMPLETED'}];
    //     default:
    //         return state;
    // }
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todo = (state = [], action) => {
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
                        ...task,
                        completed: !task.completed
                    });
                }
                return {...task};
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