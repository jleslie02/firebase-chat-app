import * as C from '../constants';
import {
  offset,
  claims
} from './index';

describe('claims reducer', () => {
  let result;
  let expectedResult;
  let initialState;
  let action;

  beforeEach(() => {
    initialState = [];
  });

  describe('when the action type is C.PRODUCTS.UPDATE_CLAIMS', () => {
    beforeEach(() => {
      action = {
        type: C.PRODUCTS.UPDATE_CLAIMS,
        claims: [{}]
      };

      result = claims(initialState, action);
      expectedResult = [{}];
    });

    it('should return the correct result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});

describe('offset reducer', () => {
  let result;
  let expectedResult;
  let initialState;
  let action;

  beforeEach(() => {
    initialState = 40;
  });

  describe('when the action type is random', () => {
    beforeEach(() => {
      action = {
        type: "FOO"
      };
      result = offset(initialState, action);
      expectedResult = 40;
    });

    it('should return the correct result', () => {
      expect(result).toEqual(expectedResult);
    });
  });
});
