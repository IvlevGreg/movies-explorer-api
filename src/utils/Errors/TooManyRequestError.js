import { DEFAULT_429_ERROR_TEXT } from '../constants/ERROR_TEXTS';
import { STATUS_429 } from '../constants/STATUS_CODE';

export class TooManyRequestError extends Error {
  constructor(nextValidRequestDate, message = DEFAULT_429_ERROR_TEXT) {
    super(message + nextValidRequestDate);
    this.statusCode = STATUS_429;
  }
}
