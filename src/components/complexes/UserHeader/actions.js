import * as C from '../../../constants';

export function signout() {
  return {
    type: C.USER.USER_SIGNOUT
  };
}

export function updateState(status, showToast) {
  return {
    type: C.USER.UPDATE_STATUS,
    status,
    showToast
  };
}

export function sendRequest(to) {
  return {
    type: C.USER.SEND_REQUEST_FRIEND,
    to
  };
}

export function setPageTitle(title) {
  return {
    type: C.PAGE.UPDATE_TITLE,
    title: title
  };
}
