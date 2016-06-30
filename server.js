var express = require('express');
var helper = require('./devhelper.js');
var appconfig = require('./app.config');

var host = appconfig.host;
var port = appconfig.port;

var app = express();
app = helper.applyWebpackMiddleware(app);

app.use('/', express.static(__dirname + '/public/'));

app.listen(port, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
