const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';

function dirPath(dest) {
  return path.join(__dirname, dest);
}

function addWebpackMiddlewaresToExpressApp({ app, debug }) {
  const compiler = webpack(webpackConfig);

  const entries = webpackConfig.entry;

  Object.keys(entries).forEach(entryName => {
    entries[entryName].unshift('react-hot-loader/patch');
    // webpack/hot/dev-server will reload the entire page if the HMR update fails
    // webpack/hot/only-dev-server reload the page manually
    // ...unshift(`webpack-dev-server/client?http://${host}:${port}`);
    entries[entryName].unshift('webpack-hot-middleware/client');
  });

  // enable webpack middleware for hot-reloads in development
  const devMiddlewareOptions = {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      poll: true,
    },
    hot: true,
    stats: {
      colors: true,
      chunks: true,
      'errors-only': true,
    },
  };
  app.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
  const hotMiddlewareOptions = {
    log: debug,
  };
  app.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));

  return app;
}

function configTemplates(expressApp) {
  const templatesPath = path.join(__dirname, 'templates');
  const nunjucksEnv = nunjucks.configure(templatesPath, {
    noCache: isDev,
    autoescape: true,
    express: expressApp,
  });

  nunjucksEnv.addGlobal('isDev', isDev);

  // view engine setup
  expressApp.set('views', templatesPath);
  expressApp.set('view engine', 'html');
  return expressApp;
}

const requireRoutes = (app, dir) => {
  const routesPath = path.join(__dirname, dir);

  fs.readdirSync(routesPath).forEach(file => {
    const filePath = path.join(__dirname, dir, file);
    // eslint-disable-next-line global-require
    const route = require(filePath);
    app.use(route);
  });
};

const enableGraphql = expressApp => {
  const typeDefs = `
  type Query {
    users(name: String!): [User]
  }
  type User {
    uuid: String,
    name: String,
    phone: String,
    email: String,
    avatar: String,
    color: String
  }`;

  // The resolvers
  const resolvers = {
    Query: {
      users: (root, args) => {
        const { name } = args;
        // eslint-disable-next-line global-require
        const users = require('./data.json');
        const matched = users.filter(
          user => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
        );

        return matched.length > 0 ? matched : users;
      },
    },
  };

  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  expressApp.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  expressApp.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
};

const init = ({ debug }) => {
  let app = express();
  app.use(logger(isDev ? 'dev' : 'common'));
  app.use(favicon(path.join(__dirname, '/../public/', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (isDev) {
    app = addWebpackMiddlewaresToExpressApp({ app, debug });
  }
  app = configTemplates(app);

  app.use('/assets', express.static(dirPath('/../public/assets/')));

  enableGraphql(app);
  requireRoutes(app, 'routes');

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handling middleware must have 4 arguments
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', err);
  });
  return app;
};

module.exports = init;
