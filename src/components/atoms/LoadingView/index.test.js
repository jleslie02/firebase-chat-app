import React from 'react';
import {mountWrap} from '../../../test/enzyme-setup';
import {StatelessLoadingView} from '.';

describe(`ListHeader (Unit Tests)`, () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      classes: {
        loading: "loading"
      },
      className: "classname"
    };
    wrapper = mountWrap(<StatelessLoadingView {...props} />);
  });

  it('should set the proper data-sn ID', () => {
    expect(wrapper.find('[data-sn="loading-view"]')).toHaveLength(1);
  });
  it('should have a spinner icon', () => {
    expect(wrapper.find('.fa-spinner')).toHaveLength(1);
  });
});
