var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

//config.entry.index.unshift(`webpack-dev-server/client?http://${host}:${port}`);

// webpack/hot/dev-server will reload the entire page if the HMR update fails
// webpack/hot/only-dev-server reload the page manually
config.entry.index.unshift("react-hot-loader/patch");
config.entry.index.unshift("webpack/hot/dev-server");
config.entry.index.unshift("webpack-hot-middleware/client");
//config.entry.unshift("webpack/hot/only-dev-server");

//enable webpack middleware for hot-reloads in development
var compiler = webpack(config);

module.exports = {
  applyWebpackMiddleware: (app) => {
    app.use(devMiddleware(compiler, {
      publicPath: config.output.publicPath,
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
    }));
    app.use(hotMiddleware(compiler, {
      log: console.log
    }));

    return app;
  }
};
