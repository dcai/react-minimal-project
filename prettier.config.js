module.exports = {
  tabWidth: 2,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.json', '.babelrc'],
      options: {
        parser: 'json',
        singleQuote: false,
      },
    },
  ],
};
