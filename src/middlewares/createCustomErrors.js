import { ValidationError, getValidationMDErrorText } from '../utils/Errors';
import { ERROR_VALIDATION_ERROR } from '../utils/constants/ERROR_CODE';

export default (err, _, __, next) => {
  const { statusCode, name } = err;

  // маппинг ошибок express-brute в единый формат

  if (!statusCode) {
    switch (name) {
      case ERROR_VALIDATION_ERROR:
        next(new ValidationError(getValidationMDErrorText(err.errors)));
        break;
      default:
        next();
    }
  } else {
    next(err);
  }
};
