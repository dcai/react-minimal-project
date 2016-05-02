var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var appconfig = require('./app.config');

var host = appconfig.host;
var port = appconfig.port;

config.entry.index.unshift(`webpack-dev-server/client?http://${host}:${port}`);

// webpack/hot/dev-server will reload the entire page if the HMR update fails
// webpack/hot/only-dev-server reload the page manually
config.entry.index.unshift("webpack/hot/dev-server");
//config.entry.unshift("webpack/hot/only-dev-server");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  contentBase: "./",
  stats: {
    colors: true
  },
  historyApiFallback: true
}).listen(port, host, function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
