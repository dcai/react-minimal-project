var path = require('path');
var webpack = require('webpack');

var npmpackage = require('./package.json');

function dirPath(dest){
  return path.resolve(__dirname, dest);
}

const debug = process.env.NODE_ENV === 'production' ? false : true;

const config = {
  devtool: debug ? 'eval' : 'cheap-module-source-map',
  entry: {
    vendor: Object.keys(npmpackage.dependencies),
    index: ['./src/index.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: 'vendor.bundle.js',
      chunks: ['index'],
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [{
      // match js or jsx
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  },
  resolve: {
    extensions: ['', '.js', 'jsx']
  },
};

if(debug) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      comments: false,
      sourceMap: false,
      minimize: true,
    })
  );
}

module.exports = config;
