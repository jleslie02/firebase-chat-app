import * as C from '../../../constants';

export function setPageTitle(title) {
  return {
    type: C.PAGE.UPDATE_TITLE,
    title: title
  };
}
