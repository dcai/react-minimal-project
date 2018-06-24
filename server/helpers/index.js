const bodyParser = require('body-parser');
const chokidar = require('chokidar');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const debug = require('debug');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const webpackConfig = require('../../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';

const dirPath = dest => path.join(__dirname, dest);

function addWebpackMiddlewaresToExpressApp({ app }) {
  const compiler = webpack(webpackConfig);
  const entries = webpackConfig.entry;
  Object.keys(entries).forEach(entryName => {
    entries[entryName].unshift('react-hot-loader/patch');
    // webpack/hot/dev-server will reload the entire page if the HMR update fails
    // webpack/hot/only-dev-server reload the page manually
    // ...unshift(`webpack-dev-server/client?http://${host}:${port}`);
    entries[entryName].unshift('webpack-hot-middleware/client');
  });

  // enable webpack middleware for hot-reloads in development
  const devMiddlewareOptions = {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      poll: true,
    },
    hot: true,
    stats: {
      colors: true,
      chunks: true,
      'errors-only': true,
    },
  };
  app.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
  const hotMiddlewareOptions = {
    log: debug('nodejs'),
  };
  app.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));

  return app;
}

function configTemplates(expressApp) {
  const templatesPath = path.join(__dirname, '..', 'templates');
  const nunjucksEnv = nunjucks.configure(templatesPath, {
    noCache: isDev,
    autoescape: true,
    express: expressApp,
  });

  nunjucksEnv.addGlobal('isDev', isDev);

  // view engine setup
  expressApp.set('views', templatesPath);
  expressApp.set('view engine', 'html');
  return expressApp;
}

const requireMiddlewares = (app, dir) => {
  const middlewaresPath = path.join(__dirname, '..', dir);

  fs.readdirSync(middlewaresPath).forEach(file => {
    const filePath = path.join(middlewaresPath, file);
    // eslint-disable-next-line global-require
    app.use(require(filePath));
  });
};

const init = ({ debug }) => {
  let app = express();
  app.use(logger(isDev ? 'dev' : 'common'));
  app.use(favicon(path.join(__dirname, '../../public/', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (isDev) {
    app = addWebpackMiddlewaresToExpressApp({ app });
  }
  app = configTemplates(app);

  app.use('/assets', express.static(dirPath('/../public/assets/')));

  // routes are middlewares too
  requireMiddlewares(app, 'routes');
  requireMiddlewares(app, 'middlewares');

  return app;
};

/**
 *
 * ['helpers', 'routes', 'middlewares'].forEach(dir => addWatchDir(path.join(__dirname, dir)));
 *
 */
function addWatchDir(dir, options = {}) {
  const watcher = chokidar.watch(dir, options);
  const watchDebug = debug('watcher');
  watchDebug(`Watching: ${dir}`);
  watcher.on('ready', () => {
    watchDebug(`Ready: ${dir}`);
    watcher.on('all', (eventName, changedPath) => {
      delete require.cache[changedPath];
    });
  });
}

module.exports = {
  addWebpackMiddlewaresToExpressApp,
  configTemplates,
  dirPath,
  init,
  isDev,
  requireMiddlewares,
};
