import { NotFoundError } from '../utils/Errors';

export const handle404Errors = (_, __, next) => {
  next(new NotFoundError('Такой страницы не существует'));
};
