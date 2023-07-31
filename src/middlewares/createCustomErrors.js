const { ValidationError, getValidationErrorText } = require('../utils/Errors');

module.exports = (err, _, __, next) => {
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
