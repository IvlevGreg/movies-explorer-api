const DEFAULT_401_ERROR_TEXT = 'Необходима авторизация';

export class AuthError extends Error {
  constructor(message = DEFAULT_401_ERROR_TEXT) {
    super(message);
    this.statusCode = 401;
  }
}
