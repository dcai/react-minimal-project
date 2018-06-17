import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import App from './App.jsx';
import rootReducer from './reducers.js';
import mySaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ diff: true }));
}
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

const domHook = document.getElementById('app');
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    domHook,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // If use Webpack in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // eslint-disable-next-line global-require
    const NextApp = require('./App.jsx').default;

    render(NextApp);
  });
}
