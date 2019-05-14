import {testSaga} from 'redux-saga-test-plan';
import {getLoginStatus} from '../utils';
import * as C from '../../constants';

import {
  goEnsureLogin
} from './index';

describe('Ensure login saga', () => {
  let action;

  beforeEach(() => {
    action = {
      history: [],
      location: {
        pathname: '/'
      }
    };

    const mockWindow = Object.create(global.window);
    mockWindow.location = {
      replace: () => ""
    };

    let mockLocalStorage = Object.create(global.localStorage);
    mockLocalStorage = {
      setItem: () => "",
      getItem: () => ''
    };
    global.localStorage = mockLocalStorage;
    global.window = mockWindow;
  });

  describe('EnsureLogin', () => {
    describe('User trying to logout', () => {
      beforeEach(() => {
        action.location = {
          pathname: '/logout'
        };
      });

      it('should go to another link', () => {
        testSaga(goEnsureLogin, action)
          .next()
          .put({type: C.PAGE.UPDATE_LOADING, loading: true})
          .next()
          .put({type: C.PAGE.UPDATE_LOADING, loading: false})
          .next()
          .isDone();
      });
    });

    describe('User trying to get to a link without signing in', () => {
      beforeEach(() => {
        action.location = {
          pathname: '/',
          search: {
            login_key: "key"
          }
        };
      });

      it('should go to link if is logged in', () => {
        testSaga(goEnsureLogin, action)
          .next()
          .put({type: C.PAGE.UPDATE_LOADING, loading: true})
          .next()
          .select(getLoginStatus)
          .next(true)
          .put({type: C.PAGE.UPDATE_LOADING, loading: false})
          .next()
          .isDone();
      });
      it('should go to link if is logged in', () => {
        testSaga(goEnsureLogin, action)
          .next()
          .put({type: C.PAGE.UPDATE_LOADING, loading: true})
          .next()
          .select(getLoginStatus)
          .next(false)
          .put({type: C.PAGE.UPDATE_LOADING, loading: false})
          .next()
          .isDone();
      });
    });
  });
});
