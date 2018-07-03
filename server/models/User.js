'use strict';
import Mongoose from 'mongoose';
import UserModelClass from './classes/User';
import UserValidation from './validates/user';
import UserPlugin from './plugins/user';

const schema = new Mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      validate: [UserValidation.validateEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 20
    },
    country: {
      type: String
    },
    department: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

schema.loadClass(UserModelClass);
schema.plugin(UserPlugin);

module.exports = Mongoose.model('User', schema);
