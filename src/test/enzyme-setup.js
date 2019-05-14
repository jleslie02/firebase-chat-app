import React from 'react';
import {mount, configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ThemeProvider} from 'react-jss';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {MemoryRouter} from 'react-router-dom';
import merge from 'ramda/src/merge';
import defaultLocaleData from '../locale/en-US';
import {flattenObj} from '../utils/common';
import configureStore from '../store/config';
import initialState from '../store/initialState';
import {createAtomicTheme} from '../theme';

configure({adapter: new Adapter()});

const localeData = flattenObj(defaultLocaleData);
const myTheme = createAtomicTheme({channel: "snacknation"});

class ProviderWrapper extends React.Component {
  render() {
    let {children} = this.props;
    const {store, memoryProps} = this.props;

    const state = merge(initialState, store || {});
    children = (
      <Provider store={configureStore(state)}>
        {children}
      </Provider>
    );

    return (
      <ThemeProvider theme={myTheme}>
        <IntlProvider locale="en" messages={localeData}>
          <MemoryRouter {...memoryProps}>
            {children}
          </MemoryRouter>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}

// Pass in the wrapperOption `store` with desired state to use the Redux storage provider
const mountWrap = (node, wrapperOptions = {}) => {
  const wrapper = <ProviderWrapper {...wrapperOptions}>{node}</ProviderWrapper>;
  return mount(wrapper);
};

// Pass in the wrapperOption `store` with desired state to use the Redux storage provider
const shallowWrap = (node, wrapperOptions = {}) => {
  const wrapper = <ProviderWrapper {...wrapperOptions}>{node}</ProviderWrapper>;
  return shallow(wrapper);
};



export {
  defaultLocaleData,
  configureStore,
  initialState,
  createAtomicTheme,
  localeData,
  myTheme,
  ProviderWrapper,
  mountWrap,
  shallowWrap,
  mount,
  shallow
};
