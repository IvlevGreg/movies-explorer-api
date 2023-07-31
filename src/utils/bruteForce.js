const MongooseStore = require('express-brute-mongoose');
const ExpressBrute = require('express-brute');
const bruteUsers = require('../models/bruteUsers');
const failBruteCallback = require('../middlewares/failBruteCallback');

const bruteUsersStore = new MongooseStore(bruteUsers);

const bruteforceAll = new ExpressBrute(bruteUsersStore, {
  freeRetries: 100,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});

const bruteforceAuth = new ExpressBrute(bruteUsersStore, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failBruteCallback,
});

module.exports = { bruteforceAll, bruteforceAuth };
