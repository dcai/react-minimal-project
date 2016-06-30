var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackconfig = require('./webpack.config');

//webpackconfig.entry.index.unshift(`webpack-dev-server/client?http://${host}:${port}`);

// webpack/hot/dev-server will reload the entire page if the HMR update fails
// webpack/hot/only-dev-server reload the page manually
webpackconfig.entry.index.unshift("webpack/hot/dev-server");
webpackconfig.entry.index.unshift("webpack-hot-middleware/client");
//webpackconfig.entry.unshift("webpack/hot/only-dev-server");

//enable webpack middleware for hot-reloads in development
var compiler = webpack(webpackconfig);

module.exports = {
  applyWebpackMiddleware: (app) => {
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackconfig.output.publicPath,
      hot: true,
      stats: {
        colors: true,
        chunks: false,
        'errors-only': true
      }
    }));
    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }));

    return app;
  }
};
