var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/index.jsx'
	],
	output: {
    path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
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

