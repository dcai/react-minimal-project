// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  root: true,
  extends: ['@friendlyrobot/eslint-config'],
  plugins: ['babel', 'react', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jquery: true,
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    console: true,
    window: true,
    document: true,
  },
};
