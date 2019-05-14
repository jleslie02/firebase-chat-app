import * as C from '../../constants';
import {
  title,
  loading
} from './index';

describe('title reducer', () => {
  let result;
  let expectedResult;
  let initialState;
  let action;

  beforeEach(() => {
    initialState = null;
  });

  describe('when the action type is C.PAGE.UPDATE_TITLE', () => {
    beforeEach(() => {
      action = {
        type: C.PAGE.UPDATE_TITLE,
        title: "title"
      };

      result = title(initialState, action);
      expectedResult = "title";
    });

    it('should return the correct result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});

describe('loading reducer', () => {
  let result;
  let expectedResult;
  let initialState;
  let action;

  beforeEach(() => {
    initialState = true;
  });

  describe('when the action type is C.PAGE.UPDATE_LOADING:', () => {
    beforeEach(() => {
      action = {
        type: C.PAGE.UPDATE_LOADING,
        loading: true
      };
      result = loading(initialState, action);
      expectedResult = true;
    });

    it('should return the correct result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});
