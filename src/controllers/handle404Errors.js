import { NotFoundError } from '../utils/Errors';
import { DEFAULT_NOT_FOUND_PAGE_404_ERROR } from '../utils/constants/ERROR_TEXTS';

export const handle404Errors = (_, __, next) => {
  next(new NotFoundError(DEFAULT_NOT_FOUND_PAGE_404_ERROR));
};
