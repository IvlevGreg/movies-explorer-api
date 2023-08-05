const { request } = require('./endpoint');
const {
  messageDefinedInBody, validationDefinedInBody, loginUser, signupUser, connectToMongoDBBeforeEach, connectToMongoDBBeforeAll,
} = require('./utils');
const { USER_DATA } = require('./constants');

const USER_DATA_WITH_INCORRECT_EMAIL = {
  email: 'test@example',
  password: 'Password123',
};

const USER_DATA_WITH_INCORRECT_PASSWORD = {
  email: 'test@example.com',
  password: '1',
};

const USER_DATA_WITH_EMAIL_ONLY = {
  email: 'test@example.com',
};

const USER_DATA_WITH_PASSWORD_ONLY = {
  password: 'Password123',
};

describe('WHEN auth routes called incoming data is validated', () => {
  describe.each([
    {
      route: '/signin',
      method: 'POST',
      userData: {},
      fields: 'without email and password in body',
    },
    {
      route: '/signin',
      method: 'POST',
      userData: USER_DATA_WITH_INCORRECT_EMAIL,
      fields: 'with incorrect email',
    }, {
      route: '/signin',
      method: 'POST',
      userData: USER_DATA_WITH_INCORRECT_PASSWORD,
      fields: 'with incorrect password',
    },
    {
      route: '/signin',
      method: 'POST',
      userData: USER_DATA_WITH_PASSWORD_ONLY,
      fields: 'without password in body',
    },
    {
      route: '/signin',
      method: 'POST',
      userData: USER_DATA_WITH_EMAIL_ONLY,
      fields: 'without email in body',
    },
    {
      route: '/signup',
      method: 'POST',
      userData: {},
      fields: 'without email and password in body',
    },
    {
      route: '/signup',
      method: 'POST',
      userData: USER_DATA_WITH_INCORRECT_EMAIL,
      fields: 'with incorrect email',
    }, {
      route: '/signup',
      method: 'POST',
      userData: USER_DATA_WITH_INCORRECT_PASSWORD,
      fields: 'with incorrect password',
    },
    {
      route: '/signup',
      method: 'POST',
      userData: USER_DATA_WITH_PASSWORD_ONLY,
      fields: 'without password in body',
    },
    {
      route: '/signup',
      method: 'POST',
      userData: USER_DATA_WITH_EMAIL_ONLY,
      fields: 'without email in body',
    },
  ])('WHEN "$method $route" called $fields', ({ userData }) => {
    it('MUST return 400 and validation message', () => request
      .post('/signin')
      .send(userData)
      .then((res) => {
        expect(res.status).toBe(400);
        validationDefinedInBody(res);
        messageDefinedInBody(res);
      }));
  });
});

describe('WHEN "POST /signup" called', () => {
  connectToMongoDBBeforeEach();

  it('MUST return 201 and email with user id', () => request
    .post('/signup')
    .send(USER_DATA)

    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        data: {
          email: expect.any(String),
          _id: expect.any(String),
        },
      });
    }));

  it('MUST return 201 and not return password', () => request
    .post('/signup')
    .send(USER_DATA)

    .then((res) => {
      expect(res.status).toBe(201);
      expect(Object.hasOwn(res.body, 'password')).toBeFalsy();
      expect(res.body).toEqual(expect.not.objectContaining({
        data: {
          password: expect.any(String),
        },
      }));
    }));
});

describe('WHEN "POST /signup" called AND user already exist', () => {
  connectToMongoDBBeforeAll();
  signupUser();

  it('MUST return 409 and error message', () => request
    .post('/signup')
    .send(USER_DATA)

    .then((res) => {
      expect(res.status).toBe(409);
      messageDefinedInBody(res);
    }));
});

describe('WHEN "POST /sign-out" called ', () => {
  connectToMongoDBBeforeAll();
  signupUser();
  loginUser();

  it('MUST successfully log-out, return 200 and message', () => request
    .post('/sign-out')

    .then((res) => {
      expect(res.status).toBe(200);
      messageDefinedInBody(res);
    }));

  it('MUST return 401 and error message on auth protected route', () => request
    .post('/')

    .then((res) => {
      expect(res.status).toBe(401);
      messageDefinedInBody(res);
    }));

  it('MUST return 401 and error message on second call POST /sign-out', () => request
    .post('/')

    .then((res) => {
      expect(res.status).toBe(401);
      messageDefinedInBody(res);
    }));
});
