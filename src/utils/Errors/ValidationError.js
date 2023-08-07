import { STATUS_400 } from '../constants/STATUS_CODE';

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_400;
  }
}
