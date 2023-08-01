const MongooseStore = require('express-brute-mongoose');
const ExpressBrute = require('express-brute');
const bruteUsers = require('../models/bruteUsers');
const failBruteCallback = require('../middlewares/failBruteCallback');
const { IS_PRODUCTION } = require('./constants/IS_PRODUCTION');

let bruteUsersStore;

if (IS_PRODUCTION) {
  bruteUsersStore = new MongooseStore(bruteUsers);
} else {
  bruteUsersStore = new ExpressBrute.MemoryStore();
}

const bruteforceAll = new ExpressBrute(bruteUsersStore, {
  freeRetries: 100,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});

const bruteforceAuth = new ExpressBrute(bruteUsersStore, {
  freeRetries: IS_PRODUCTION ? 5 : 1000,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});

module.exports = { bruteforceAll, bruteforceAuth };
