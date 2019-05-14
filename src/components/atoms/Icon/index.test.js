import React from 'react';
import {mountWrap} from '../../../test/enzyme-setup';
import Icon from '.';

describe(`Icon (Unit Tests)`, () => {
  let wrapper, props;
  let mockCallback;
  beforeEach(() => {
    mockCallback = jest.fn();
    props = {
      classes: {
        iconWrapper: "iconWrapper"
      },
      disabled: false,
      fontProps: {
        icon: 'cloud'
      },
      onClickFn: mockCallback,
      className: "customClass"
    };
    wrapper = mountWrap(<Icon {...props} />);
  });

  it('should set the proper data-sn ID', () => {
    expect(wrapper.find('[data-sn="icon"]')).toHaveLength(1);
  });

  it('should be mounted', () => {
    expect(wrapper.find('[data-sn="icon"]').hasClass('customClass')).toBeTruthy();
  });

  it('should add a onClick handler', () => {
    wrapper.find('[data-sn="icon"]').simulate('click');
    expect((mockCallback.mock.calls.length)).toBe(1);
  });
});

describe(`Disabled Icon (Unit Tests)`, () => {
  let wrapper, props;
  let mockCallback;
  beforeEach(() => {
    mockCallback = jest.fn();
    props = {
      classes: {
        iconWrapper: "iconWrapper"
      },
      disabled: true,
      fontProps: {
        icon: 'spinner'
      },
      onClickFn: mockCallback,
      className: "customClass"
    };
    wrapper = mountWrap(<Icon {...props} />);
  });

  it('should disable onClick handler', () => {
    wrapper.find('[data-sn="icon"]').simulate('click');
    expect((mockCallback.mock.calls.length)).toBe(0);
  });
});
