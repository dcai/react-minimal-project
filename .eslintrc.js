// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
const ERROR = 2;
const WARN = 1;
const OFF = 0;
module.exports = {
  root: true,
  extends: ['@friendlyrobot/eslint-config'],
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
  },
};
