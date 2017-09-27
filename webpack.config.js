var path = require('path');
var webpack = require('webpack');
var npmpackage = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  devtool: isProd ? 'eval' : 'cheap-eval-source-map',
  entry: {
    //vendor: Object.keys(npmpackage.dependencies),
    vendor: ['react', 'react-dom'],
    index: ['./react/index.jsx']
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: '[name].bundle.js',
    publicPath: '/assets/js/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      chunks: ['index'],
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  module: {
    loaders: [{
      // match js or jsx
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'react')
    }]
  },
  resolve: {
    extensions: ['.js', 'jsx']
  }
};

if (isProd) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    })
  );
} else {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;
