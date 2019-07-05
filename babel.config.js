const pkg = require('./package.json');

module.exports = function(api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
  ];

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
  ];
  return { plugins, presets };
};
