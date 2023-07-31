const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/user');

const USER_409_ERROR_TEXT = 'Пользователь с таким email уже существует';

const {
  UserExist, AuthError,
} = require('../utils/Errors');
const { JWT_TOKEN } = require('../utils/constants/JWT_TOKEN');

const rejectPromiseWrongEmailOrPassword = () => Promise.reject(
  new AuthError('Неверное сочетание почты и пароля'),
);

const login = (req, res, next) => {
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

const logout = (req, res) => {
  res
    .cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
    });

  res.send({ message: 'Вы успешно вышли из профиля' });
};

const createUser = (req, res, next) => {
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

module.exports = {
  createUser,
  login,
  logout,
};
