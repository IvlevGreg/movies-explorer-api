export class UserExist extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
