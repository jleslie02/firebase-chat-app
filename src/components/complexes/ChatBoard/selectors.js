import {createSelector} from 'reselect';
import isEmpty from 'ramda/src/isEmpty';
import groupBy from 'ramda/src/groupBy';
import { isToday, isYesterday, formatDate } from '../../../utils/common';

// Get Column Objects
export const chats = (state) => state.chats;
export const selectedChat = (state) => state.selectedChat;
export const groups = (state) => state.groups;
export const current = (state) => state.users.currentUser || {};

export const getCurrentBoard = (chat, groups, current, messages) => {
  let idxes = [];
  chat = isEmpty(chat) ? (current || {}).selectedGroup || '' : chat

  if (groups[chat]) {
    idxes = Object.keys((groups[chat] || {}).messages || {}) || [];
  } else {
    const priv = Object.keys((current || {}).privates || {})
    idxes = priv.filter((m) => {
      let msg = messages[m];
      if (!msg) return undefined;
      return ((msg.user.toLowerCase() === chat.toLowerCase() && msg.to.toLowerCase() === current.id) || (msg.user.toLowerCase() === current.id && msg.to.toLowerCase() === chat))
    })
  }
  if (idxes === []) return idxes;

  return groupBy((message) => {
    if (message) {
      const created = message.created;
      return isToday(created) ? 'Today' :
        isYesterday(created) ? 'Yesterday' :
        formatDate(created)
    } else {
      return;
    }
  }, idxes.map((m) => {
      return messages[m]
  }))
}

export const getSelectedChatBoard = createSelector(
  [selectedChat, current, groups, chats],
  (selectedChat, current, groups, chats) => {
    return (isEmpty(current.friends) && isEmpty(groups)) ? {} : getCurrentBoard(selectedChat, groups, current, chats)
  }
)

export const getSelectedChat = createSelector(
  [selectedChat, current],
  (selectedChat, current) => {
    return isEmpty(selectedChat) ? (current || {}).selectedGroup || '' : selectedChat
  }
)
