import { DEFAULT_400_ERROR_TEXT } from '../constants/ERROR_TEXTS';
import { STATUS_400 } from '../constants/STATUS_CODE';

export class Default400Error extends Error {
  constructor(message = DEFAULT_400_ERROR_TEXT) {
    super(message);
    this.statusCode = STATUS_400;
  }
}
