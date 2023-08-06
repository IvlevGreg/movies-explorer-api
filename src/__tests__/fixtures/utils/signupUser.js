const { request } = require('../../endpoint');
const { USER_DATA } = require('../constants');

const signupUser = () => {
  beforeAll(async () => {
    await request
      .post('/signup')
      .send(USER_DATA);
  });
};

module.exports = {
  signupUser,
};
