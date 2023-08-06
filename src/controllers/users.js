import users from '../models/user';
import { Conflict409Error, NotFoundError } from '../utils/Errors';
import { CONFLICT_409_ERROR_EMAIL_NAME, NOT_FOUND_USER_ERROR_TEXT } from '../utils/constants/ErrorTexts';

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

export const getUserMe = (req, res, next) => {
  const { _id } = req.user;

  return findUserById(_id, res, next);
};

export const updateUserById = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(
    userId,
    { name, email },
    { returnDocument: 'after', runValidators: true },
  )
    .then((usersData) => {
      if (usersData) {
        if (name === usersData.name || email === usersData.email) {
          throw new Conflict409Error(CONFLICT_409_ERROR_EMAIL_NAME);
        }
        res.send(usersData);
        return;
      }
      throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
    })
    .catch(next);
};
