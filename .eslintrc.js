// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  root: true,
  env: {
    jquery: true,
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['babel', 'react'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'array-bracket-spacing': ['error', 'never'],
    'block-scoped-var': 'error',
    'brace-style': ['error', '1tbs'],
    camelcase: 'warn',
    'computed-property-spacing': ['error', 'never'],
    curly: 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'max-depth': ['warn', 3],
    'max-len': ['warn', 100],
    'max-statements': ['warn', 15],
    'new-cap': 'warn',
    'no-extend-native': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'warn',
    'no-use-before-define': ['error', 'nofunc'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', 'avoid-escape'],
    semi: ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-unary-ops': 'error',
  },
  globals: {
    console: true,
  },
};
