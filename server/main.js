const appconfig = require('../config');
const nodeDebug = require('debug')('nodejs');
const { init } = require('./helpers');

const host = process.env.HOST || appconfig.host;
const port = process.env.PORT || appconfig.port;

init({ debug: nodeDebug }).listen(port, host, err => {
  if (err) {
    nodeDebug(err);
  }
  nodeDebug(`Listening at http://${host}:${port}/`);
});
