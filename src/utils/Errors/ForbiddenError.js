import { DEFAULT_403_ERROR_TEXT } from '../constants/ERROR_TEXTS';
import { STATUS_403 } from '../constants/STATUS_CODE';

export class ForbiddenError extends Error {
  constructor(message = DEFAULT_403_ERROR_TEXT) {
    super(message);
    this.statusCode = STATUS_403;
  }
}
