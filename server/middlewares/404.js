module.exports = (req, res, next) => {
  const err = {
    message: 'not found',
    status: 404,
  };
  next(err);
};
