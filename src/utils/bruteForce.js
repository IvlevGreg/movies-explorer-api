import MongooseStore from 'express-brute-mongoose';
import ExpressBrute from 'express-brute';
import bruteUsers from '../models/bruteUsers';
import failBruteCallback from '../middlewares/failBruteCallback';
import { IS_PRODUCTION } from './constants/IS_PRODUCTION';

let bruteUsersStore;

if (IS_PRODUCTION) {
  bruteUsersStore = new MongooseStore(bruteUsers);
} else {
  bruteUsersStore = new ExpressBrute.MemoryStore();
}

export const bruteforceAll = new ExpressBrute(bruteUsersStore, {
  freeRetries: IS_PRODUCTION ? 1000 : 1000,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});

export const bruteforceAuth = new ExpressBrute(bruteUsersStore, {
  freeRetries: IS_PRODUCTION ? 500 : 1000,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});
