import { DEFAULT_429_ERROR_TEXT } from '../constants/ERROR_TEXTS';

export class TooManyRequestError extends Error {
  constructor(nextValidRequestDate, message = DEFAULT_429_ERROR_TEXT) {
    super(message + nextValidRequestDate);
    this.statusCode = 429;
  }
}
