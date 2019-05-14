import React from 'react';
import {mountWrap} from '../../../test/enzyme-setup';
import {StatelessTag} from '.';

describe(`Tag (Unit Tests)`, () => {
  let wrapper, props;
  let mockCallback;
  beforeEach(() => {
    mockCallback = jest.fn();
    props = {
      classes: {
        tagBox: "tagBox",
        disabled: "disabled",
        checked: "checked",
        icon: "icon"
      },
      isChecked: false,
      label: "Tag",
      className: "customClass",
      editing: false,
      intl: {formatMessage: () => {}},
      onCheckFn: mockCallback
    };
    wrapper = mountWrap(<StatelessTag {...props} />);
  });

  it('should set the proper data-sn ID', () => {
    expect(wrapper.find('[data-sn="tag"]')).toHaveLength(1);
  });

  it('should have the custom class', () => {
    expect(wrapper.find('.tagBox').hasClass('customClass')).toBeTruthy();
  });

  it('should not toggle on click', () => {
    wrapper.find('.tagBox').simulate('click');
    expect((mockCallback.mock.calls.length)).toBe(0);
  });

  it('should be disabled', () => {
    expect(wrapper.find('.tagBox').hasClass('disabled')).toBeTruthy();
  });

  it('should not be checked', () => {
    expect(wrapper.find('.tagBox').hasClass('checked')).toBeFalsy();
  });


  describe(`Editable Tag`, () => {
    beforeEach(() => {
      props.editing = true;
      props.isChecked = true;

      wrapper = mountWrap(<StatelessTag {...props} />);
    });

    it('should have a "times" icon', () => {
      expect(wrapper.find('.fa-times')).toHaveLength(1);
    });

    it('should toggle on click', () => {
      wrapper.find('.tagBox').simulate('click');
      expect((mockCallback.mock.calls.length)).toBe(1);
    });
  });

  describe(`Editable unchecked tag`, () => {
    beforeEach(() => {
      props.editing = true;
      props.isChecked = false;

      wrapper = mountWrap(<StatelessTag {...props} />);
    });

    it('should have a "plus" icon', () => {
      expect(wrapper.find('.fa-plus')).toHaveLength(1);
    });
  });
});

