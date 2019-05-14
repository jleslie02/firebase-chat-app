import {createSelector} from 'reselect';
import isEmpty from 'ramda/src/isEmpty';

// Get Column Objects
export const groups = (state) => state.groups;
export const selectedChat = (state) => state.selectedChat;
export const friends = (state) => state.friends;
export const current = (state) => state.users.currentUser || {};

export const getInfo = (groupss, friendss, chat, user) => {
  if (friendss[chat.toLowerCase()]) {
    return [friendss[chat.toLowerCase()]]
  } else {
    let group = groupss[chat || user.selectedGroup] || {}
    return Object.keys(group.members || {}).map((item) => friendss[item.toLowerCase()] || {});
  }
}

export const getGroupInfo = createSelector(
  [groups, friends, selectedChat, current],
  (groups, friends, selectedChat, user) => {
    return (isEmpty(selectedChat) && !user.selectedGroup) ? null : getInfo(groups, friends, selectedChat, user)
  }
);