import { STATUS_404 } from '../constants/STATUS_CODE';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_404;
  }
}
