import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/user';

import { UserExist, AuthError } from '../utils/Errors';
import { JWT_TOKEN } from '../utils/constants/JWT_TOKEN';

const USER_409_ERROR_TEXT = 'Пользователь с таким email уже существует';

const rejectPromiseWrongEmailOrPassword = () => Promise.reject(
  new AuthError('Неверное сочетание почты и пароля'),
);

export const login = (req, res, next) => {
  const { password, email } = req.body;

  users.findOne({ email }).select('+password')
    .then((userData) => (userData && bcrypt.compare(password, userData.password)
      ? userData : rejectPromiseWrongEmailOrPassword()))
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, JWT_TOKEN, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        });

      res.send({ message: 'Всё верно!' });
    })
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

        res.status(201).send({
          data: {
            name: nameData,
            email: emailData,
            _id,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new UserExist(USER_409_ERROR_TEXT));
        } else {
          next(err);
        }
      }));
};
