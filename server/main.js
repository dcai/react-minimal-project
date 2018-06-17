const appconfig = require('../config');
const app = require('./app');
const debug = require('debug')('nodejs');

const host = process.env.HOST || appconfig.host;
const port = process.env.PORT || appconfig.port;

app({ debug }).listen(port, host, err => {
  if (err) {
    debug(err);
  }
  debug(`Listening at http://${host}:${port}/`);
});
