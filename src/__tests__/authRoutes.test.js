import jwt from 'jsonwebtoken';
import { request } from './endpoint';

import {
  connectToMongoDBBeforeAll,
  connectToMongoDBBeforeEach,
  messageDefinedInBody,
  signupUser,
  validationDefinedInBody,
} from './fixtures/utils';

import { USER_DATA } from './fixtures/constants';
import User from '../models/user';
import { JWT_TOKEN } from '../utils/constants/JWT_TOKEN';

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

  it('MUST return 201 and contain userData in DB', () => request
    .post('/signup')
    .send(USER_DATA)

    .then((res) => {
      expect(res.status).toBe(201);
      return User.findOne({ email: USER_DATA.email })
        .then((user) => {
          expect(user).toBeDefined();
          expect(user.email).toBe(USER_DATA.email);
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

describe('WHEN "POST /signin" called ', () => {
  connectToMongoDBBeforeAll();
  signupUser();

  it('MUST return 200 and not return password', () => request
    .post('/signin')
    .send(USER_DATA)

    .then((res) => {
      expect(res.status).toBe(200);
      expect(Object.hasOwn(res.body, 'password')).toBeFalsy();
      expect(res.headers['set-cookie'][0]).toContain('jwt=');
      expect(res.body).toEqual(expect.not.objectContaining({
        data: {
          password: expect.any(String),
        },
      }));
    }));

  it('MUST return 401 and error message on not registered user', () => request
    .post('/signin')
    .send({ ...USER_DATA, email: '123@mail.ru' })

    .then((res) => {
      expect(res.status).toBe(401);
      messageDefinedInBody(res);
    }));
});

describe('WHEN "POST /sign-out" called ', () => {
  connectToMongoDBBeforeAll();
  signupUser();

  it('MUST successfully log-out, return 200 and message', () => request
    .post('/sign-out')
    .set('Cookie', [`jwt=${jwt.sign({ _id: '123' }, JWT_TOKEN, { expiresIn: '7d' })}`])

    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie'][0]).toContain('jwt=; Max-Age=-1');
      messageDefinedInBody(res);
    }));

  it('MUST return 401 and message if "POST /sign-out" called twice', () => request
    .post('/sign-out')
    .set('Cookie', [`jwt=${jwt.sign({ _id: '123' }, JWT_TOKEN, { expiresIn: '7d' })}`])

    .then(() => request
      .post('/sign-out')
      .then((res) => {
        expect(res.status).toBe(401);
        messageDefinedInBody(res);
      })));
});
