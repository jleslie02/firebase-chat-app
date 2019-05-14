import {put, takeEvery, select, call, all} from 'redux-saga/effects';
import {getMessagesLength, updateGroupMessages, updatePrivateMessages, readMessages} from '../../apiCalls'
import * as C from '../../constants';
import { getCurrentUser,getAllFriends, getAllGroups, getAllChats} from '../utils';

export function *goUpdateChat(action) {
  try {
    let messagesLength = yield call(getMessagesLength);

    const friends = yield select(getAllFriends);
    const groups = yield select(getAllGroups);

    if (groups[action.group]) {
      let newMessages = {
        ...(groups[action.group].messages || {}),
        [messagesLength]: true
      };
      yield call(updateGroupMessages, messagesLength, action.group, action.time, true, action.comment, newMessages, action.user.name)

    } else if (friends[action.group]) {
      let newMessages = {
        ...(friends[action.user.name.toLowerCase()].privates || {}),
        [messagesLength]: true
      };

      let newMessages1 = {
        ...(friends[action.group.toLowerCase()].privates || {}),
        [messagesLength]: true
      };
      // update message
      // update private for me
      // update private for the selected
      // console.log(updateGroupMessages, messagesLength, action.group, action.time, false, action.comment, newMessages1, newMessages, action.user.name)
      yield call(updatePrivateMessages, messagesLength, action.group, action.time, false, action.comment, newMessages1, newMessages, action.user.name)
    }

    // yield updateUserStatus(user.id, user, action.status)
  } catch (error) {
    console.log(error)
    action.showToast(0, "Error sending chat!")
  }
}

export function *watchSendChat() {
  yield takeEvery(C.CHATS.SEND_CHAT_REQUEST, goUpdateChat);
}

export function *goReadMessages(action) {
  try {
    let user = yield select(getCurrentUser);
    const chats = yield select(getAllChats);

    const privates = Object.keys(user.privates || {});

    if (privates.length > 0) {
      let messages = privates.filter(item => {
        if (chats[item] && chats[item].user.toLowerCase() === action.from && !chats[item].seen) {
          return item
        } else {
          return undefined
        }
      })

      messages = messages.filter(item => item);
      if (messages.length > 0) {
        yield readMessages(messages)
        yield all(messages.map(m => {
          return put({type: C.USER.UPDATE_CHAT, id: m, chat: {...chats[m], seen: true}});
        }
      ));
      }
    }
  } catch (error) {
    console.log(error)
    action.showToast(0, "Error sending chat!")
  }
}

export function *watchReadMessages() {
  yield takeEvery(C.CHATS.READ_REQUEST, goReadMessages);
}
