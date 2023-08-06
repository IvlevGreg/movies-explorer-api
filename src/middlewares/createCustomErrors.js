import { ValidationError, getValidationErrorText } from '../utils/Errors';

export default (err, _, __, next) => {
  const { statusCode, name } = err;

  // маппинг ошибок express-brute в единый формат

  if (!statusCode) {
    switch (name) {
      case 'ValidationError':
        next(new ValidationError(getValidationErrorText(err.errors)));
        break;
      default:
        next();
    }
  } else {
    next(err);
  }
};
