import { DEFAULT_401_ERROR_TEXT } from '../constants/ERROR_TEXTS';
import { STATUS_401 } from '../constants/STATUS_CODE';

export class AuthError extends Error {
  constructor(message = DEFAULT_401_ERROR_TEXT) {
    super(message);
    this.statusCode = STATUS_401;
  }
}
