import * as C from '../../../constants';
export function setSelectedChat(name) {
  return {
    type: C.USER.SELECT_CHAT,
    name
  };
}

export function readAllMessages(from) {
  return {
    type: C.CHATS.READ_REQUEST,
    from
  };
}

export function acceptRequest(from, id) {
  return {
    type: C.USER.ACCEPT_REQUEST,
    from,
    id
  };
}

export function declineRequest(from, id) {
  return {
    type: C.USER.DECLINE_REQUEST,
    from,
    id
  };
}

