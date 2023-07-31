const DEFAULT_429_ERROR_TEXT = 'Слишком много запросов с вашего ip адреса поэтому мы ограничили'
  + ' некоторые запросы для вас. Попробуйте выключить впн или подождите еще ';

class TooManyRequestError extends Error {
  constructor(nextValidRequestDate, message = DEFAULT_429_ERROR_TEXT) {
    super(message + nextValidRequestDate);
    this.statusCode = 429;
  }
}

module.exports = { TooManyRequestError };
