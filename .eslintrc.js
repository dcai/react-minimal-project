// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['babel', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jquery: true,
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    console: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': ['error', 'ignorePackages'],
  },
};
