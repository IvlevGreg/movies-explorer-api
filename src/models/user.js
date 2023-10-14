import mongoose from 'mongoose';
import validator from 'validator';
import { INCORRECT_EMAIL_VALIDATION_ERROR } from '../utils/constants/ERROR_TEXTS';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: validator.isEmail,
      message: INCORRECT_EMAIL_VALIDATION_ERROR,
    },
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model('user', userSchema);
