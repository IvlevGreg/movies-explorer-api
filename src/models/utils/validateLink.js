import { LINK_PATTERN } from '../../utils/constants/LINK_PATTERN';

export const validateLink = {
  validator: (str) => LINK_PATTERN.test(str),
  message: 'Некореектный url',
};
