import {createSelector} from 'reselect';
import isEmpty from 'ramda/src/isEmpty';
import groupBy from 'ramda/src/groupBy';
import map from 'ramda/src/map';

// Get Column Objects
export const chats = (state) => state.chats;
export const selectedChat = (state) => state.selectedChat;
export const groups = (state) => state.groups;
export const requests = (state) => (state.users.currentUser || {}).requests || {};
export const current = (state) => state.users.currentUser;
export const friends = (state) => state.friends;
export const allRequests = (state) => state.requests

export const getUnreadMessages = createSelector(
  [chats, current],
  (chats, current) => {
    return isEmpty(chats) ? {} : groupBy((item) => item.user.toLowerCase(), Object.values(chats).filter((req) => req.seen === false && req.to.toLowerCase() === current.id))
  }
);

export const getRequests = createSelector(
  [requests, allRequests],
  (requests, allRequests) => {
    return isEmpty(requests) ? [] : Object.keys(requests).map((item) => allRequests[item] || {})
  }
);

export const getSelectedChat = createSelector(
  [selectedChat, current],
  (selectedChat, current) => {
    return isEmpty(selectedChat) ? (current || {}).selectedGroup || '' : selectedChat
  }
)

export const getAllFriends = createSelector(
  [friends, current],
  (friends, current) => {
    return isEmpty(friends) ? [] : map((val) => {
      return friends[val] || {}
    }, Object.keys((current || {}).friends || {})).filter((item) => !isEmpty(item))
  }
)