
import React from 'react';
import {render, ReactDOM} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'react-jss';
import {BrowserRouter} from 'react-router-dom';
import {flattenObj} from './utils/common';
import defaultLocaleData from './locale/en-US';
import App from './App/App';
import configureStore from './store/config';
import initialState from './store/initialState';
import makeAtomicTheme from './theme';

require('./stylesheets/index.css');
require('./stylesheets/fonts.css');

const store = configureStore(initialState);
const localeData = flattenObj(defaultLocaleData);
const myTheme = makeAtomicTheme();

const renderApp = () => (
  <ThemeProvider theme={myTheme}>
    <IntlProvider locale="en" messages={localeData}>
      <Provider store={store}>
        <AppContainer>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContainer>
      </Provider>
    </IntlProvider>
  </ThemeProvider>
);


// Hot Module Replacement AP
if (module.hot) {
  module.hot.accept('./App/App.js', () => {
    ReactDOM.render(
      renderApp(),
      document.getElementById('root')
    );
  });
}

function runOnLoaded() {
  render(renderApp(), document.getElementById('root'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  runOnLoaded();
} else {
  window.addEventListener('DOMContentLoaded', runOnLoaded, false);
}
