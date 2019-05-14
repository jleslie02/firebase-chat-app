
import * as C from '../../constants';
import initialState from "../../store/initialState";

export const users = (state = initialState.users, action) => {
  switch (action && action.type) {
    case C.USER.ADD_USER:
      return {...state, currentUser: action.user};
    case C.USER.UPDATE_FRIEND: {
      if(action.id === ((state.currentUser || {}).name || '').toLowerCase())
        return {...state, currentUser: {...state.currentUser, ...action.friend}};
      return state;
    }
    case C.USER.UPDATE_REQUESTS: {
      let newUser = {
        ...state.currentUser,
        requests: action.requests
      }
      return {...state, currentUser: newUser};
    }
    case C.USER.UPDATE_USER:
      return {...state, currentUser: action.user};

    case C.USER.SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const requests = (state = initialState.requests, action) => {
  switch (action && action.type) {
    case C.USER.UPDATE_REQUEST:
      return {...state, [action.id]: action.request};
    case C.USER.UPDATE_REQUESTS:
      return action.requests;
    case C.USER.SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const friends = (state = initialState.friends, action) => {
  switch (action && action.type) {
    case C.USER.UPDATE_FRIEND:
      return {...state, [action.id]: action.friend};
    case C.USER.UPDATE_REQUESTS: {
      let newFriends = {
        ...state[action.id],
        requests: action.requests
      }
      return {...state, [action.id]: newFriends};
    }
    case C.USER.SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const groups = (state = initialState.groups, action) => {
  switch (action && action.type) {
    case C.USER.UPDATE_GROUP:
      return {...state, [action.id]: action.group};

    case C.USER.UPDATE_GROUPS: 
      return action.groups

    case C.USER.SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const chats = (state = initialState.chats, action) => {
  switch (action && action.type) {
    case C.USER.UPDATE_CHAT:
      return {...state, [action.id]: action.chat};
    case C.CHATS.UPDATE_CHATS:
      return action.chats
    case C.USER.SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const selectedChat = (state = initialState.selectedChat, action) => {
  switch (action && action.type) {
    case C.USER.SELECT_CHAT:
      return action.name

    case C.USER.SIGNOUT:
      return '';

    default:
      return state;
  }
};