require('isomorphic-fetch');
require('es6-promise').polyfill();
var express = require('express');
var helper = require('./devhelper.js');
var appconfig = require('./app.config');

var host = appconfig.host;
var port = appconfig.port;

var app = express();
app = helper.applyWebpackMiddleware(app);

app.use('/proxy', (req, res) => {
  var query = req.query.q;
  var options = {
    headers: {
      'auth-key': '28744ed5982391881611cca6cf5c240',
      //'Accept': 'application/json',
      //'Content-Type': 'application/json'
    },
  };
  const api = 'https://digitalapi.auspost.com.au/postcode/search.json';
  fetch(`${api}?q=${query}`, options).then( response => {
    console.info(response.headers);
    return response.json();
  }).then( json => {
    console.info(json)
    res.end('kkk')
  })
});
app.use('/', express.static(__dirname + '/public/'));

app.listen(port, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
});
