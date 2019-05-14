import {combineReducers} from 'redux';
import * as C from '../../constants';

export const initialState = {
  title: null,
  loading: false
};

export const title = (state = initialState.title, action) => {
  switch (action.type) {
    case C.PAGE.UPDATE_TITLE:
      return action.title;
    case C.PAGE.UPDATE_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case C.PAGE.UPDATE_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default combineReducers({
  title
});
