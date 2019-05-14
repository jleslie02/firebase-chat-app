import "regenerator-runtime/runtime";
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import forEachObjIndexed from 'ramda/src/forEachObjIndexed';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import * as sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {

  const logger = () => next => action => { // eslint-disable-line no-unused-vars
    return next(action);
  };

  // Basically to avoid redux extension to log unecessary actions
  // and just focus on the ones we have developped in our reducers
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  // Create a store with saga middleware
  const myStore = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk, logger, sagaMiddleware)
  ));

  // Run the sagas
  forEachObjIndexed((saga) => {
    sagaMiddleware.run(saga);
  }, sagas);

  return myStore;
}
