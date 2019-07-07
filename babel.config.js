const pkg = require('./package.json');

module.exports = function(api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ];

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'umd',
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
  ];
  return { plugins, presets };
};
