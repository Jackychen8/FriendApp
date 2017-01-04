import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import moment from 'moment';

// Globals
let friendId = 0;

console.log(moment().format('LLL'));

/////////////////////////////////////////////////////////////////////
////////////////////////// Helper Functions /////////////////////////
const getVisibleFriends = (friends, filter) => {
    switch(filter){
        case 'SHOW_ALL':
            return friends;
        case 'SHOW_OUTER':
            return friends.filter(p => p.group === 1);
        case 'SHOW_INNER':
            return friends.filter(p => p.group === 2);
        case 'SHOW_CORE':
            return friends.filter(p => p.group === 3);
        default:
            return friends;
    }
};

const getVisibleMessages = (friends, activeId) => {
    let messages = [];
    //console.log(friends.activeFriend);
    console.log('Active Friend: ' + activeId);
    if(friends[activeId]){
        //let messageLen = friends.activeFriend.messages.length;
        //if(messageLen > 5){
        //    return messageLen.slice(messageLen-5);
        //}
        console.log(friends[activeId].messages);
        return friends[activeId].messages;
    }

    // friends.forEach( friend => {
    //     if(friend.active){
    //         friend.messages.forEach( message => {
    //             messages.push(message);
    //         });
    //     }
    // });
    return messages;
};

const getActiveFriends = (friends) => {
    let activeNames = [];
    friends.forEach( friend => {
        if(friend.active){
            activeNames.push(friend.name);
        }
    });
    return activeNames;
}

const friendCircle = (outer, inner, core) => {
    if(outer){
        return 1;
    }else if(inner){
        return 2;
    }else if(core){
        return 3;
    }else{
        return 0;
    }
};


/////////////////////////////////////////////////////////////////////
//////////////////////////// Action Creators ///////////////////////
const activateFriend = (name,id) => {
    return {
        type: 'SET_ACTIVE_FRIEND',
        name,
        id
    };
};

const addFriend = (name, group) => {
    return {
        type: 'ADD_FRIEND',
        name: name,
        group: group,
        id: friendId++
    };
};

const setFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
};

const addMessage = (message, name) => {
    return {
        type: 'ADD_MESSAGE',
        name: name,
        message: { 
                    text: message,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a')
                }
    }
};

/////////////////////////////////////////////////////////////////////
///////////////////// Presentational Components ////////////////////
const VisiblityFilter = () => {
    return(
        <div>
            <b>Friends: </b>
            <FilterLink filter='SHOW_ALL'>
                All
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_OUTER'>
                Outer
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_INNER'>
                Inner
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_CORE'>
                Core
            </FilterLink>
        </div>
    );
};

const Friend = ({
    onClick,
    active,
    name,
    group
}) => {
    return(
        <li onClick={onClick}
            style={{
                textDecoration:
                active ? 'line-through' : 'none'
            }}>
            {name}{': '}{group}
        </li>
    );
};

const FriendList = ({
    friends,
    active,
    onClickFriend
}) => {
    return (
        <ul style={{float: 'left'}}>
            {friends.map(friend => 
                <Friend
                    key={friend.id}
                    {...friend}
                    onClick={()=>onClickFriend(friend.name, friend.id)}
                    active={active===friend.name}
            />)}
        </ul>
    );
}

let FriendBox = ({dispatch}) => {
    let i;
    return(
        <div style={{float:'left', padding: '20px',}}>
            <h3>Friends App</h3><br/>
            <form>
              {'Friend Name: '}
              <input type="text" size="35" ref={node => {i = node;}} />
              <br/>
              {'Friend Group: '}
              <input type="radio" ref={node => i.out = node} name="circle" /> Outer
              {' '}
              <input type="radio" ref={node => i.in = node} name="circle" /> Inner
              {' '}
              <input type="radio" ref={node => i.core = node} name="circle" /> Core
            </form>
            <button onClick={() => {
                dispatch(addFriend(i.value, friendCircle(i.out.checked, 
                    i.in.checked, i.core.checked)));
                i.out.checked=false;
                i.in.checked=false;
                i.core.checked=false;
                i.value = '';
            }}>
                Add Friend
            </button>
        </div>
    );
};

const Link = ({
    filterName,
    active,
    onClick
}) => {
    if(active){
        return <span>{filterName}</span>
    }
    return(
        <a href="#" onClick={onClick}>
        {filterName}
        </a> 
    );
};

const MessageBox = ({
    name,
    dispatch
}) => {
    let message;
    return(
        <div style={{float: 'right'}}>
            Message Box
            <br/>
            <textarea ref={node => {message = node;}} rows="7" cols="50"/>
            <br/>
            <button onClick={() => {
                // Works console.log(addMessage(message.value));
                dispatch(addMessage(message.value, name));
                message.value = '';
            }}>
                Send Message
            </button>
        </div>
    );
};

const MessageFeed = ({messages, name}) => {
    //let activeFriends = names.join(', ');
    return(
        <div style={{minHeight:'200px'}}>
            Message Group:{' '}{name}
            <br/>
            {messages.map( message => {
                return(
                <div key={message.time} style={{textAlign: 'right'}}>
                    {message.text}
                    <br/>
                    <span style={{fontSize: '12px', color:'grey'}}>{message.time}</span>
                </div>
                );
            })}
        </div>
    );
};

const FriendApp = () => {
    return(
        <div>
            <AddFriendBox />
            <AddMessageFeed />
            <hr/>
            <VisiblityFilter />
            <VisibleFriends />
            <AddMessageBox />
        </div>
    );
};



/////////////////////////////////////////////////////////////////////
//////////////////////// Container Components ///////////////////////
const AddFriendBox = connect()(FriendBox);

const mapStatetoMessageBoxProps = (state) => {
    return {
        name: state.activeFriend.name
    };
};

const AddMessageBox = connect(mapStatetoMessageBoxProps, null)(MessageBox);

const mapStateToMessageProps = (state) => {
    return {
        messages: getVisibleMessages(state.friends, state.activeFriend.id),
        name: state.activeFriend.name
    };
};

const AddMessageFeed = connect(mapStateToMessageProps, null)(MessageFeed);

const mapStateToFriendProps = (state) => {
    return {
        friends: getVisibleFriends(state.friends, state.visibilityFilter),
        active: state.activeFriend.name
    };
};

const mapDispatchToFriendProps = (dispatch) => {
    return {
        onClickFriend: (name, id) => dispatch( activateFriend(name, id) )
    };
};
const VisibleFriends = connect(
    mapStateToFriendProps,
    mapDispatchToFriendProps
)(FriendList);

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: state.visibilityFilter === ownProps.filter,
        filterName: ownProps.children
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


/////////////////////////////////////////////////////////////////////
//////////////////////////// Reducers //////////////////////////////
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const activeFriend = (state = '', action) => {
    switch(action.type){
        case 'SET_ACTIVE_FRIEND':
            return {
                name: action.name,
                id: action.id
            };
        default:
            return state;
    }
};

const friends = (state = [], action) => {
    switch(action.type){
        case 'ADD_FRIEND':
            return [...state, {
                name: action.name,
                id: action.id,
                group: action.group,
                //active: false,
                messages: []
            }];
        // case 'ACTIVATE_FRIEND':
        //     return state.map(friend => {
        //         console.log("In Activate Friend");
        //         if(friend.id === action.id){
        //             return ({
        //                 ...friend,
        //                 active: !friend.active
        //             });
        //         }
        //         return {...friend};
        //     });
        case 'ADD_MESSAGE':
            console.log('in Add_message');
            return state.map(friend => {
                console.log(friend.name + action.name);
                if(friend.name === action.name){
                    console.log('in Add_message');
                    return ({
                        ...friend,
                        messages: [...friend.messages, action.message]
                    });
                }
                return {...friend};
            });
            // return [...state.friends, state.friends.messages
        default:
            return state;
    }
};

const friendApp = combineReducers({friends, visibilityFilter, activeFriend});

ReactDOM.render(
    <Provider store={createStore(friendApp)}>
        <FriendApp />
    </Provider>,
    document.getElementById('root')
);