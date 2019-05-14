import * as C from '../../../constants';

export function setPageTitle(title) {
  return {
    type: C.PAGE.UPDATE_TITLE,
    title: title
  };
}

export function populateUser(user, showToast) {
  return {
    type: C.USER.ADD_CURRENT_USER,
    user,
    showToast
  };
}
