import React from 'react';
import {shallow} from '../../../test/enzyme-setup';
import {StatefulBrowserView} from '.';


describe(`BrowserView (Unit Tests)`, () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      classes: {
        browserView: "browserView"
      },
      className: "classname",
      children: <div className="children" />,
      offset: 30
    };
    wrapper = shallow(<StatefulBrowserView {...props} />);
  });

  it('should set the proper data-sn ID', () => {
    expect(wrapper.find('[data-sn="browser-view"]')).toHaveLength(1);
  });

  it('should set the proper height', () => {
    expect(wrapper.instance().state.height).toBe(798);
  });

  describe(`Offset and name changes`, () => {
    beforeEach(() => {
      props = {...props, name: "new-component", offset: -30};
      wrapper = shallow(<StatefulBrowserView {...props} />);
    });

    it('should set the proper data-sn ID', () => {
      expect(wrapper.find('[data-sn="new-component"]')).toHaveLength(1);
    });

    it('should set the proper height', () => {
      expect(wrapper.instance().state.height).toBe(738);
    });
  });
});

