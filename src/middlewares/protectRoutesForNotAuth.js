import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/Errors';
import { JWT_TOKEN } from '../utils/constants/JWT_TOKEN';

export default (req, res, next) => {
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
