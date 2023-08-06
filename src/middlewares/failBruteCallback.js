import plural from 'plural-ru';
import { TooManyRequestError } from '../utils/Errors';

const failBruteCallback = (_, __, next, nextValidRequestDate) => {
  const minutes = Math.floor((new Date(nextValidRequestDate) - Date.now()) / (1000 * 60));
  const pluralMinutes = plural(minutes, 'минута', 'минуты', 'минут');
  const text = `${minutes} ${pluralMinutes}`;

  next(new TooManyRequestError(text));
};

export default failBruteCallback;
