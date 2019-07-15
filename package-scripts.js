const { concurrent, series, crossEnv } = require('nps-utils');

const envDebug = crossEnv(
  ['NODE_ENV=development', 'DEBUG=nodejs,watcher'].join(' '),
);
const envProd = crossEnv(['NODE_ENV=production'].join(' '));

module.exports = {
  scripts: {
    default: 'nps server.dev',
    server: {
      dev: `${envDebug} node ./server/main.js`,
      prod: `${envProd} node ./server/main.js`,
    },
    production: {
      default: series.nps('build', 'server.prod'),
    },
    build: {
      default: series('node ./postinstall.js', `${envProd} webpack`),
    },
    lint: {
      default: 'eslint .',
      fix: 'eslint --fix .',
    },
    test: {
      default: 'jest',
      watch: {
        script: 'jest --watch',
        description: 'run in the amazingly intelligent Jest watch mode',
      },
    },
    prettier:
      'prettier --config ./prettier.config.js --write "{server,react,__{tests,mocks}__}/**/*.js"',
    validate: concurrent.nps('lint', 'test', 'build'),
  },
};
