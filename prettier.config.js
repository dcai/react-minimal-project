// prettier.config.js
module.exports = {
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  parser: 'flow',
  overrides: [
    {
      files: ['*.json', '.babelrc'],
      options: {
        printWidth: 800,
        parser: 'json',
        singleQuote: false,
      },
    },
  ],
};
