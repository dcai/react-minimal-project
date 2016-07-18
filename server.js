var express = require('express');
var swig = require('swig');
var helper = require('./devhelper.js');
var appconfig = require('./app.config');
var bodyParser = require('body-parser');

const fetch = require('isomorphic-fetch');

var host = process.env.HOST || appconfig.host;
var port = process.env.PORT || appconfig.port;

const SEEK_API = 'https://adposting-integration.cloud.seek.com.au';
const OAUTH2_API = 'https://api.seek.com.au/auth/oauth2/token';

const CLIENT_ID = '0050569E050B1ED68EB6C28551E35100';
const CLIENT_SECRET = 'dXlHZVhcdZLSBnnj8Ta7CVdHpc7R3Dhx';

const requestAccessToken = (cb) => {
  fetch(OAUTH2_API, {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => {
    return response.json();
  }).then(json => {
    const access_token = json.access_token;
    cb(access_token);
  });
}

const expireAd = (adId, cb) => {
  requestAccessToken( token => {
    const headers = {
      'Content-Type': 'application/vnd.seek.advertisement-patch+json; version=1; charset=utf-8',
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.seek.advertisement+json; version=1; charset=utf-8, application/vnd.seek.advertisement-error+json; version=1; charset=utf-8',
    };
    const body = [
      {
      "path": "state",
      "op": "replace",
      "value": "Expired",
      },
    ];
    const api = SEEK_API + '/advertisement/' + adId;
    console.info(api);
    fetch(api, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers,
    })
    .then(response  => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(e => console.info(e))
    .then( () => {
      cb({})
    });
  })
}

const fetchAd = (adId, cb) => {
  requestAccessToken( token => {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.seek.advertisement-list+json; version=1; charset=utf-8, application/vnd.seek.advertisement-error+json; version=1; charset=utf-8'
    };
    const api = SEEK_API + '/advertisement/' + adId;
    fetch(api, {
      method: 'GET',
      headers
    })
    .then(response  => {
      return response.json();
    })
    .then( ad => {
      cb(ad);
    });
  })
}
const createOrUpdateAds = (body, cb) => {
  requestAccessToken( token => {
    let api = SEEK_API + '/advertisement';
    let method = 'POST';
    if (body._links) {
      const path = body._links.self.href;
      api = SEEK_API + path;
      method = 'PUT';
    }
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/vnd.seek.advertisement+json; version=1; charset=utf-8',
      'Accept': 'application/vnd.seek.advertisement+json; version=1; charset=utf-8, application/vnd.seek.advertisement-error+json; version=1; charset=utf-8',
    };
    fetch(api, {
      method,
      headers,
      body: JSON.stringify(body),
    })
    .then(response => {
      return response.json();
    })
    .then( json => {
      cb(json)
    });
  })
}

const fetchAllAds = (cb) => {
  requestAccessToken( token => {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.seek.advertisement-list+json; version=1; charset=utf-8, application/vnd.seek.advertisement-error+json; version=1; charset=utf-8'
    };
    fetch(SEEK_API + '/advertisement', {
      method: 'GET',
      headers
    })
    .then(response  => {
      return response.json();
    })
    .then( json => json._embedded)
    .then( ads => {
      cb(ads);
    });
  })
}

var app = express();
var jsonParser = bodyParser.json()
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

if (process.env.NODE_ENV !== 'production') {
  app = helper.applyWebpackMiddleware(app);
}

app.use('/public', express.static(__dirname + '/public/'));

app.get('/newjob', (req, res) => {
  res.render('newjob', {});
})

app.get('/advertisement/:adId', (req, res) => {
  const adId = req.params.adId;
  fetchAd(adId, ad => {
    res.render('edit', {jobDetails: ad});
  })
})

app.get('/expire/advertisement/:adId', (req, res) => {
  const adId = req.params.adId;
  expireAd(adId, () => {
    res.redirect('/list');
  })
})

app.get('/', (req, res) => {
  res.render('home', {});
})

app.get('/api/takeid', (req, res) => {
  const takeId = req.query.takeid;
  res.redirect('/advertisement/' + takeId);
})

app.post('/api/post', jsonParser, (req, res) => {
  var body = req.body;
  createOrUpdateAds(body, f => res.json(f));
})

app.get('/list', (req, res) => {
  fetchAllAds( (ads) => {
    ads.advertisements.forEach(ad => {
      console.info(ad)
      ad.viewLink = SEEK_API + ad._links.view.href;
    })
    res.render('list', ads);
  });
})

app.listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}/`);
})
