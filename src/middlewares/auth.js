const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('../utils/Errors');
const { JWT_TOKEN } = require('../utils/constants/JWT_TOKEN');

module.exports = (req, res, next) => {
  const tokenCookie = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!tokenCookie && !(authorization && authorization.startsWith('Bearer '))) {
    next(new AuthError());
    return;
  }

  const token = tokenCookie || authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    next(new AuthError());
  }

  next();
};
