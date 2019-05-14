import {createSelector} from 'reselect';
import isEmpty from 'ramda/src/isEmpty';
import includes from 'ramda/src/includes'

// Get Column Objects
export const requests = (state) => (state.users.currentUser || {}).requests || {};
export const groups = (state) => state.groups;
export const selectedChat = (state) => state.selectedChat;
export const friends = (state) => state.friends;
export const current = (state) => state.users.currentUser || {};
export const allRequests = (state) => state.requests

export const getInfo = (groupss, friendss, chat, user) => {
  if (friendss[chat.toLowerCase()]) return null;
  let group = groupss[chat || user.selectedGroup] || {}
  let obj = {
    online: Object.keys(group.members || {}).filter((item) => {
      return (friendss[item.toLowerCase()] || {}).status === 1
    }).length,
    busy: Object.keys(group.members || {}).filter((item) => (friendss[item.toLowerCase()] || {}).status === 2).length,
    size: Object.keys(group.members || {}).length,
    isAdmin: group.admin === (user.name || '').toLowerCase(),
    isMember: group.admin !== (user.name || '').toLowerCase() && includes(user.id, Object.keys(group.members || {}))
  }

  return obj
}

export const getRequests = createSelector(
  [requests, allRequests],
  (requests, allRequests) => {
    return isEmpty(requests) ? [] : Object.keys(requests).map((item) => allRequests[item] || {})
  }
);

export const getUnseenRequests = createSelector(
  [requests],
  (requests) => {
    return isEmpty(requests) ?  [] : Object.values(requests).filter((req) => !req.seen)
  }
);

export const getGroupInfo = createSelector(
  [groups, friends, selectedChat, current],
  (groups, friends, selectedChat, user) => {
    return (isEmpty(selectedChat) && !user.selectedGroup) || friends[selectedChat.toLowerCase()] ? null : getInfo(groups, friends, selectedChat, user)
  }
);