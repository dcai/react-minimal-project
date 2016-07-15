var express = require('express');
var swig = require('swig');
var helper = require('./devhelper.js');
var appconfig = require('./app.config');

var host = process.env.HOST || appconfig.host;
var port = process.env.PORT || appconfig.port;

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

if (process.env.NODE_ENV !== 'production') {
  app = helper.applyWebpackMiddleware(app);
}

app.use('/', express.static(__dirname + '/public/'));
app.use('/static', express.static(__dirname + '/static/'));

app.get('/test', (req, res) => {
  res.render('test', {});
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
})

app.listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
