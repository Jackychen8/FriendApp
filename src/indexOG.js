import React from 'react';
import ReactDOM from 'react-dom';
//import TodoApp from './ReduxToDo.js';
//import css from './App.css';
import todoApp from './ReduxToDo.js';
//import App from './AppCounter.js'
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

//const store = createStore(todoApp);

//filter is a prop, children is contents of the link
const Link = ({ active, children, onClick }) => {
  if(active) {
    return <span>{children}</span>;
  }
  return (
    <a href='#' onClick={ e => {
        e.preventDefault();
        onClick();
    }}>
    {children}
    </a>
  );
};

// class FilterLink extends React.Component {
//     componentDidMount() {
//         const { store } = this.context;
//         this.unsubscribe = store.subscribe(()=>
//             this.forceUpdate()
//         );
//     }
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//     render(){
//         const props = this.props;
//         const { store } = this.context;
//         return (
//             <Link
//                 active={props.filter === store.getState().visibilityFilter}
//                 onClick={()=>
//                     store.dispatch({
//                         type: 'SET_VISIBILITY_FILTER',
//                         filter: props.filter
//                     })
//                 }
//             >
//             {props.children}
//             </Link>
//         );
//     }
// }

// props is passed as second argument naturally
const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToLinkProps = ( dispatch, ownProps ) => {
    return {
        onClick: ()=>
            dispatch(setVisibilityFilter(ownProps.filter))
    };
};

// FilterLink.contextTypes = {
//     store: React.PropTypes.object
// };
const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

const getVisibleTodos = (todos, filter)=>{
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
        );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
        );
    default:
      return todos;
  }
};

const Todo = ({
    onClick,
    completed,
    text
}) => {
    return(
        <li
            onClick={onClick}
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
}) => (
    <ul>
      {todos.map(task =>
        <Todo
            key={task.id}
            {...task}
            onClick={()=>onClickTodo(task.id)}
        />
      )}
    </ul>
);

// Action Creators
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: todoID++,
        text: text
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};

let AddTodo = ({dispatch}) => {
    let input;
    //const {store} = this.context;
    // "this" doesn't exist for presentational components
    return(
        <div>
            <input type="text" ref={node=> {input = node;}}/>
            <button onClick={() => {
                dispatch(addTodo(input.value)); 
                input.value='';
            }}>
              Add Todo
            </button>
        </div>
    );
};
AddTodo = connect()(AddTodo);

const Footer = ({
    visibilityFilter,
    onFilterClick
}) => (
    <p>
        Show:
        {' '}
        <FilterLink 
            filter='SHOW_ALL' 
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
);

// takes redux store state and returns the props that 
// need to be passed to presentational list component

// maps the redux store state to the props of the TodoList component that 
// are related to the data from the redux store
const mapStateToTodoProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

// maps the dispatch method of this store to the callback props of TodoList 
// component. It specifies the behavior, which callback prop dispatches which action
const mapDispatchToTodoProps = (dispatch) => {
    return {
        onClickTodo: id =>
            dispatch(toggleTodo(id))
    };
};

const VisibleTodoList = connect(
    mapStateToTodoProps,
    mapDispatchToTodoProps
)(TodoList);

// class VisibleTodoList extends React.Component {
//     componentDidMount() {
//         this.unsubscribe = store.subscribe(()=>
//             this.forceUpdate()//anytime store changes
//         );
//     }
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//     render() {
//         //const props = this.props;
//         const state = store.getState();
//         return (
//             <TodoList
//                 todos={
//                    getVisibleTodos(state.todos, state.visibilityFilter)
//                    }
//                 onClickTodo={id =>
//                        dispatch({
//                            type: 'TOGGLE_TODO',
//                            id
//                        })
//                 }
//             />
//         );
//     }
// }

let todoID = 0;
const TodoApp = () => {
    return (
      <div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
      </div>
    );
};

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  //<App />,
  document.getElementById('root')
);