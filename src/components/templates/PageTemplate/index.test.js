import React from 'react';
import {mountWrap} from '../../../test/enzyme-setup';
import PageTemplate from '.';

describe(`Button (Unit Tests)`, () => {
  let wrapper, props;
  let mockCallback;
  beforeEach(() => {
    mockCallback = jest.fn();
    props = {
      classes: {
        page: "page",
        header: "header",
        hero: "hero",
        children: "children"
      },
      labelId: "clear",
      intl: {formatMessage: () => {}},
      onClick: mockCallback
    };
    wrapper = mountWrap(<PageTemplate {...props} />);
  });

  it('should set the proper data-sn ID', () => {
    expect(wrapper.find('[data-sn="page-template"]')).toHaveLength(1);
  });
  it('should have a header', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });
  it('should have a child', () => {
    expect(wrapper.find('.children')).toHaveLength(1);
  });
});
