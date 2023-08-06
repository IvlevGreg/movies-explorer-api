import { DEFAULT_403_ERROR_TEXT } from '../constants/ERROR_TEXTS';

export class ForbiddenError extends Error {
  constructor(message = DEFAULT_403_ERROR_TEXT) {
    super(message);
    this.statusCode = 403;
  }
}
