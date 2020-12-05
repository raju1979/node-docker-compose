const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8
  },
  confirmPassword: {
    type: String
  },
  photo: {
      type: string
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;


