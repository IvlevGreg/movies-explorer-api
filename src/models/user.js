const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true,
    validate: {
      validator: validator.isEmail,
      message: 'Некорректный формат почты',
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

module.exports = mongoose.model('user', userSchema);
