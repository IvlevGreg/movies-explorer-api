const users = require('../models/user');

const {
  NotFoundError,
} = require('../utils/Errors');

const NOT_FOUND_USER_ERROR_TEXT = 'Пользователь не найден';

const sendUsersData = (usersData, res) => {
  if (usersData) {
    res.send(usersData);
    return;
  }
  throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
};

const findUserById = (userId, res, next) => users.findById(userId)
  .then((usersData) => sendUsersData(usersData, res))

  .catch(() => next(new NotFoundError(NOT_FOUND_USER_ERROR_TEXT)));

const getUserMe = (req, res, next) => {
  const { _id } = req.user;

  return findUserById(_id, res, next);
};

const updateUserById = (req, res, next) => {
  const { name } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(
    userId,
    { name },
    { returnDocument: 'after', runValidators: true },
  )
    .then((usersData) => sendUsersData(usersData, res))
    .catch(next);
};

module.exports = {
  updateUserById,
  getUserMe,
};
