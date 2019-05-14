import * as C from '../../../constants';
export function sendChat(comment, group, user, time) {
  return {
    type: C.CHATS.SEND_CHAT_REQUEST,
    comment,
    group,
    user,
    time
  };
}
