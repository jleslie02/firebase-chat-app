import {combineReducers} from 'redux';
import {users, requests, friends, groups, chats, selectedChat} from "./users";
import page from "./page";

const rootReducer = combineReducers({
  users,
  selectedChat,
  requests,
  friends,
  groups,
  chats,
  page
});

export default rootReducer;
