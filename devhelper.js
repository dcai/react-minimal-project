var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');

webpackConfig.entry.index.unshift("react-hot-loader/patch");
// webpack/hot/dev-server will reload the entire page if the HMR update fails
// webpack/hot/only-dev-server reload the page manually
// webpackConfig.entry.index.unshift(`webpack-dev-server/client?http://${host}:${port}`);
webpackConfig.entry.index.unshift("webpack-hot-middleware/client");

//enable webpack middleware for hot-reloads in development
var compiler = webpack(webpackConfig);

module.exports = {
  applyWebpackMiddleware: (app) => {
    var devMiddlewareOptions = {
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
        chunks: false,
        'errors-only': true
      }
    };
    app.use(devMiddleware(compiler, devMiddlewareOptions));
    var hotMiddlewareOptions = {
      log: console.log
    };
    app.use(hotMiddleware(compiler, hotMiddlewareOptions));

    return app;
  }
};
