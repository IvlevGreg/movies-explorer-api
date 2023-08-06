import { LINK_PATTERN } from '../../utils/constants/LINK_PATTERN';
import { INCORRECT_URL_VALIDATION_ERROR } from '../../utils/constants/ERROR_TEXTS';

export const validateLink = {
  validator: (str) => LINK_PATTERN.test(str),
  message: INCORRECT_URL_VALIDATION_ERROR,
};
