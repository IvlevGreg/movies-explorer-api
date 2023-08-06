const DEFAULT_403_ERROR_TEXT = 'Доступ запрещен';

export class ForbiddenError extends Error {
  constructor(message = DEFAULT_403_ERROR_TEXT) {
    super(message);
    this.statusCode = 403;
  }
}
