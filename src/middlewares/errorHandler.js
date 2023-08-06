import { DEFAULT_SERVER_ERROR_500_TEXT } from '../utils/constants/ERROR_TEXTS';

export default (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? DEFAULT_SERVER_ERROR_500_TEXT
        : message,
    });

  next();
};
