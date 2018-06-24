const { isDev } = require('../helpers');

// error handling middleware must have 4 arguments
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.info(JSON.stringify(err), err.message);
  res.render('error', err);
};
