import rootReducer from './reducers.js';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';

import mySaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const defaultStore = {
  ui: {},
  data: {
    counter: 0,
  },
};
const store = createStore(
  rootReducer,
  defaultStore,
  composeEnhancers(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(mySaga);

export default store;
