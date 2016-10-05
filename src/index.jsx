import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';

const rootEl = document.getElementById('app');
ReactDOM.render(
    <AppContainer><App /></AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./app.jsx', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./app.jsx').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}
