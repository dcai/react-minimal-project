var appconfig = require('../config');
var app = require('./app');
var host = process.env.HOST || appconfig.host;
var port = process.env.PORT || appconfig.port;

app.listen(port, host, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
