import { DEFAULT_401_ERROR_TEXT } from '../constants/ERROR_TEXTS';

export class AuthError extends Error {
  constructor(message = DEFAULT_401_ERROR_TEXT) {
    super(message);
    this.statusCode = 401;
  }
}
