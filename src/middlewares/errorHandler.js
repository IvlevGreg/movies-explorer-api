import { DEFAULT_SERVER_ERROR_500_TEXT } from '../utils/constants/ERROR_TEXTS';
import { STATUS_500 } from '../utils/constants/STATUS_CODE';

export default (err, req, res, next) => {
  const { statusCode = STATUS_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_500
        ? DEFAULT_SERVER_ERROR_500_TEXT
        : message,
    });

  next();
};
