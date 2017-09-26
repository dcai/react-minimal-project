import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';

const domHook = document.getElementById('app');
const render = Component =>
    ReactDOM.render(
        <AppContainer><Component /></AppContainer>,
        domHook);

render(App);

if (module.hot) {
    module.hot.accept('./app.jsx', () => {
        // If use Webpack in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./app.jsx').default;

        render(NextApp);
    });
}
