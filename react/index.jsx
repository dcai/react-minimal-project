import {AppContainer} from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

const domHook = document.getElementById('app');
const render = Component =>
  ReactDOM.render(
    <AppContainer><Component /></AppContainer>,
    domHook);

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // If use Webpack in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App.jsx').default;

    render(NextApp);
  });
}
