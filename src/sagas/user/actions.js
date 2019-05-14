import * as C from '../../constants';

export function syncRequest(request) {
  return {
    type: C.USER.UPDATE_REQUEST,
    request
  };
}

export function syncUser(user) {
  return {
    type: C.USER.SYNC_USER,
    user
  };
}

export function syncFriend(friend) {
  return {
    type: C.USER.UPDATE_FRIEND,
    friend
  };
}
