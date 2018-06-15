const appconfig = require('../config');
const app = require('./app');

const host = process.env.HOST || appconfig.host;
const port = process.env.PORT || appconfig.port;

app.listen(port, host, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
