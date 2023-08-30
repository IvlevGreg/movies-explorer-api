import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/user';

import { AuthError, Conflict409Error, NotFoundError } from '../utils/Errors';
import { JWT_TOKEN } from '../utils/constants/JWT_TOKEN';
import {
  AUTH_INCORRECT_EMAIL_OR_PASSWORD_401_ERROR,
  NOT_FOUND_USER_ERROR_TEXT,
  USER_409_ERROR_TEXT,
} from '../utils/constants/ERROR_TEXTS';
import { SUCCESS_DATA_DEFAULT } from '../utils/constants/RESULT_TEXTS';
import { STATUS_201 } from '../utils/constants/STATUS_CODE';
import { ERROR_11000 } from '../utils/constants/ERROR_CODE';

const rejectPromiseWrongEmailOrPassword = () => Promise.reject(
  new AuthError(AUTH_INCORRECT_EMAIL_OR_PASSWORD_401_ERROR),
);

export const login = (req, res, next) => {
  const { password, email } = req.body;

  users.findOne({ email }).select('+password')
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR_TEXT))
    .then((userData) => bcrypt.compare(
      password,
      userData.password,
    ).then((isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ _id: userData._id }, JWT_TOKEN, { expiresIn: '7d' });

        res
          .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          });

        res.send({ message: SUCCESS_DATA_DEFAULT });
      } else {
        return rejectPromiseWrongEmailOrPassword();
      }
    }))
    .catch(next);
};

export const logout = (req, res) => {
  res
    .cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
    });

  res.send({ message: 'Вы успешно вышли из профиля' });
};

export const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => users.create({
      email, password: hash, name,
    })
      .then((user) => {
        const {
          name: nameData,
          email: emailData,
          _id,
        } = user;

        res.status(STATUS_201).send({
          data: {
            name: nameData,
            email: emailData,
            _id,
          },
        });
      })
      .catch((err) => {
        if (err.code === ERROR_11000) {
          next(new Conflict409Error(USER_409_ERROR_TEXT));
        } else {
          next(err);
        }
      }));
};
