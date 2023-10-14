import { STATUS_409 } from '../constants/STATUS_CODE';

export class Conflict409Error extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_409;
  }
}
