var path = require('path');
var webpack = require('webpack');
var npmpackage = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? false : 'eval-source-map',
  entry: {
    //vendor: Object.keys(npmpackage.dependencies),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk'],
    index: ['./react/index.jsx'],
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: '[name].bundle.js',
    publicPath: '/assets/js/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      {
        // match js or jsx
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
        include: path.join(__dirname, 'react'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
};

if (!isProd) {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
