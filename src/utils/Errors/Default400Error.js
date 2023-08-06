import { DEFAULT_400_ERROR_TEXT } from '../constants/ERROR_TEXTS';

export class Default400Error extends Error {
  constructor(message = DEFAULT_400_ERROR_TEXT) {
    super(message);
    this.statusCode = 400;
  }
}
