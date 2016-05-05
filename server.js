var express = require('express');
var helper = require('./devhelper.js');
var appconfig = require('./app.config');

var host = process.env.HOST || appconfig.host;
var port = process.env.PORT || appconfig.port;

var app = express();
app = helper.applyWebpackMiddleware(app);

app.use('/', express.static(__dirname + '/public/'));

app.listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
