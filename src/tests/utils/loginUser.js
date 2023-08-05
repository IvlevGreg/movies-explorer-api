const { request } = require('../endpoint');
const { USER_DATA } = require('../constants');

const loginUser = () => {
  beforeAll(async () => {
    await request
      .post('/signin')
      .send(USER_DATA);
  });
};

module.exports = {
  loginUser,
};
